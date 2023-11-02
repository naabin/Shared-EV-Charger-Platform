from django.contrib.auth import get_user_model
from rest_framework.test import APIClient, APITestCase
from rest_framework import status


class UserViewSetTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass'
        )
        self.user_data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'newpass'
        }

    def test_create_user(self):
        response = self.client.post('/user/', self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access-token', response.data)

    def test_get_user_by_username_existing(self):
        response = self.client.get(f'/user/?username={self.user.username}')
        self.assertEqual(response.status_code, status.HTTP_406_NOT_ACCEPTABLE)

    def test_get_user_by_username_not_existing(self):
        response = self.client.get('/user/?username=nonexistentuser')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AuthViewSetTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass'
        )
        self.login_data = {
            'email': 'test@example.com',
            'password': 'testpass'
        }

    def test_login_valid(self):
        response = self.client.post('/user/auth/login', self.login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_login_invalid(self):
        invalid_data = {
            'email': 'test@example.com',
            'password': 'wrongpass'
        }
        response = self.client.post('/user/auth/login', invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
