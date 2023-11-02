from datetime import timedelta
from django.utils import timezone
from django.test import TestCase
from chatroom.models import Chatroom, Message
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatroomModelTests(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='pass')
        self.user2 = User.objects.create_user(username='user2', password='pass')
        self.chatroom = Chatroom.objects.create(user1=self.user1, user2=self.user2, room_name='room1')

    def test_chatroom_creation(self):
        self.assertTrue(isinstance(self.chatroom, Chatroom))
        self.assertEqual(self.chatroom.room_name, 'room1')

    def test_string_representation(self):
        self.assertEqual(str(self.chatroom), self.chatroom.room_name)

class MessageModelTests(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='pass')
        self.chatroom = Chatroom.objects.create(user1=self.user1, user2=self.user1, room_name='room1')
        self.message = Message.objects.create(chatroom=self.chatroom, sender=self.user1, content='Hello!')

    def test_message_creation(self):
        self.assertTrue(isinstance(self.message, Message))
        self.assertEqual(self.message.content, 'Hello!')

    def test_message_ordering(self):
        time_now = timezone.now()

        message1 = Message.objects.create(chatroom=self.chatroom, sender=self.user1, content='Hello!',
                                          timestamp=time_now)
        message2 = Message.objects.create(chatroom=self.chatroom, sender=self.user1, content='Hi!',
                                          timestamp=time_now + timedelta(seconds=10))
        messages = Message.objects.all()
        self.assertTrue(messages[1].timestamp < messages[2].timestamp)