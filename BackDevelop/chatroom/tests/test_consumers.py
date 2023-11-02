import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from core.routing import application
import json

User = get_user_model()

@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_chat_consumer():
    communicator = WebsocketCommunicator(application, '/ws/chat/room1/')
    connected, _ = await communicator.connect()
    assert connected, 'Not connected'

    # Test connecting to the chat
    await communicator.connect()

    # Test receiving a message from the chat
    await communicator.send_json_to({
        'type': 'chat.message',
        'message': 'Hello',
        'username': 'user1'
    })

    response = await communicator.receive_json_from()
    assert response['message'] == 'Hello'
    assert response['username'] == 'user1'

    # Test disconnecting from the chat
    await communicator.disconnect()

