from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from chatroom.models import Chatroom

User = get_user_model()

class ChatroomViewTests(APITestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='testpassword')
        self.user2 = User.objects.create_user(username='user2', password='testpassword')
        self.chatroom = Chatroom.objects.create(user1=self.user1, user2=self.user2, room_name='room1')

    def test_get_chatroom(self):
        url = reverse('get_chatroom')
        data = {'sender': 'user1', 'receiver': 'user2'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_save_chatlog(self):
        url = reverse('save_chatlog')
        data = {'room_name': 'room1', 'chatlog': '[]'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_chatrooms(self):
        url = reverse('get_user_chatrooms', args=['user1'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
