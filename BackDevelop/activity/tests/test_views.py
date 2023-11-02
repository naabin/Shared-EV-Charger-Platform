from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import Activity, UserProfile, Charger
from django.contrib.auth.models import User


class ActivityViewSetTestCase(APITestCase):

    def setUp(self):
        # Creating a user and related user profile
        self.user = UserProfile.objects.create_user(username="testuser", password="testpass")
        self.user_profile = UserProfile.objects.create(user=self.user)

        # Creating a charger
        self.charger = Charger.objects.create(name="Test Charger")

        # Creating an activity
        self.activity = Activity.objects.create(
            user=self.user_profile,
            charger=self.charger
        )

        # Authenticating the user
        self.client.force_authenticate(self.user)

    def test_create_activity(self):
        url = reverse('activity-list')  # Assuming the name is 'activity-list' in your urls
        data = {
            "state": "Pending",
            "start_time": "2023-11-01T12:00",
            "end_time": "2023-11-01T14:00",
            "duration": 120,
            "user": self.user_profile.id,
            "charger": self.charger.id,
            "total_price": "10.00"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_activity_by_owner(self):
        url = reverse('activity-get_activity_by_owner')
        response = self.client.get(url, {"owner": self.user_profile.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Test no activity found
        another_user = User.objects.create_user(username="testuser2", password="testpass2")
        another_user_profile = UserProfile.objects.create(user=another_user)
        response = self.client.get(url, {"owner": another_user_profile.id})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_approve_activity(self):
        url = reverse('activity-approve')
        response = self.client.post(url, {"activityId": self.activity.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_activity = Activity.objects.get(id=self.activity.id)
        self.assertEqual(updated_activity.approve, True)
        self.assertEqual(updated_activity.state, "Approved")

    def test_reject_activity(self):
        url = reverse('activity-reject')
        response = self.client.post(url, {"activityId": self.activity.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_activity = Activity.objects.get(id=self.activity.id)
        self.assertEqual(updated_activity.reject, True)
        self.assertEqual(updated_activity.state, "Rejected")
