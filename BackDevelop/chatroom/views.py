from users.models import UserProfile as User
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Chatroom
import json
from django.db.models import Q
import uuid

@api_view(['POST'])
@permission_classes([AllowAny])
def get_chatroom(request):
    sender_username = request.data.get('sender')
    receiver_username = request.data.get('receiver')

    chatroom = Chatroom.objects.filter(
        Q(user1__username=sender_username, user2__username=receiver_username) |
        Q(user1__username=receiver_username, user2__username=sender_username)
    ).first()

    if chatroom:
        return Response({
            'room_name': chatroom.room_name,
            'chatlog': json.loads(chatroom.chatlog)
        })
    else:
        # You'll need to define this function to generate a unique room name
        new_room_name = generate_random_room_name()
        new_chatroom = Chatroom.objects.create(
            user1=User.objects.get(username=sender_username),
            user2=User.objects.get(username=receiver_username),
            room_name=new_room_name
        )
        return Response({
            'room_name': new_room_name,
            'chatlog': []
        }, status=201)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_chatlogs(request, username):
    chatrooms = Chatroom.objects.filter(Q(user1__username=username) | Q(user2__username=username))
    data = [{'room_name': cr.room_name, 'chatlog': json.loads(cr.chatlog)} for cr in chatrooms]
    print(data)
    return Response(data)

# Define the function to generate a random room name
def generate_random_room_name():
    # Logic to generate a unique room name
    return str(uuid.uuid4())

@api_view(['POST'])
@permission_classes([AllowAny])  # Adjust this as per your security preferences
def save_chatlog(request):
    room_name = request.data.get('room_name')
    chatlog = request.data.get('chatlog')

    chatroom = Chatroom.objects.get(room_name=room_name)
    chatroom.chatlog = json.dumps(chatlog)
    chatroom.save()

    return Response({"message": "Chatlog saved successfully!"})

@api_view(['GET'])
@permission_classes([AllowAny])  # Adjust this as per your security preferences
def get_user_chatrooms(request, username):
    chatrooms = Chatroom.objects.filter(Q(user1__username=username) | Q(user2__username=username))

    data = []
    for cr in chatrooms:
        if cr.user1.username == username:
            user2 = cr.user2.username
        else:
            user2 = cr.user1.username

        data.append({
            'room_name': cr.room_name,
            'chatlog': json.loads(cr.chatlog),
            'user1': username,
            'user2': user2
        })
    return Response(data)

