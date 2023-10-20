import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Extract room name from the URL route
        self.room_name = self.scope['url_route']['kwargs']['room_name']

        # Create a Channels group name based on the room name
        self.room_group_name = f'chat_{self.room_name}'

        # Add this channel to the group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept the WebSocket connection
        await self.accept()

    async def disconnect(self, close_code):
        # Remove this channel from the group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive a message from the WebSocket
    async def receive(self, text_data, message_content=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']

        try:
            await self.save_chat_and_message_to_database(username, message)
        except Exception as e:
            print(f"Error saving chatlog: {e}")

        # Send the message to everyone in the group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username  # Include username
            }
        )

    async def chat_message(self, event):
        message = event['message']
        username = event['username']  # Extract username

        # Send the message to the WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username  # Include username
        }))
