from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Charger
from users.models import UserProfile


class ChargerViewSetTestCase(APITestCase):

    def setUp(self):
        # Create a test renter and charger
        user_profile = UserProfile(username="testUser", email="test@email.com", password="pass")
        self.renter = UserProfile.objects.create(user_profile)
        self.charger = Charger.objects.create(name="Test Charger", description="Test Description", renter=self.renter)

    def test_create_charger_successfully(self):
        url = reverse('charger-list')
        data = {
            'name': 'New Charger',
            'description': 'New Description',
            'renter': self.renter.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_charger_failure(self):
        url = reverse('charger-list')
        data = {
            'name': '',  # Empty name should cause a failure
            'description': 'New Description',
            'renter': self.renter.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_chargers(self):
        url = reverse('charger-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # We've added one charger in setUp

    def test_toggle_charger_status_successfully(self):
        url = reverse('charger-charger_status')
        initial_status = self.charger.status
        response = self.client.post(url, {'id': self.charger.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.charger.refresh_from_db()
        self.assertNotEqual(self.charger.status, initial_status)

    def test_toggle_charger_status_failure(self):
        url = reverse('charger-charger_status')
        non_existent_id = self.charger.id + 1
        response = self.client.post(url, {'id': non_existent_id})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_chargers_by_renter_with_results(self):
        url = reverse('charger-get_charger_by_renter_id')
        response = self.client.get(url, {'renter': self.renter.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_chargers_by_renter_no_results(self):
        new_renter = UserProfile(username="testUser", email="test@email.com", password="pass")
        url = reverse('charger-get_charger_by_renter_id')
        response = self.client.get(url, {'renter': new_renter.id})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
