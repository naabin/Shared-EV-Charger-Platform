from django.test import TestCase
from comments.models import Comment
from users.models import UserProfile
from charger.models import Charger
from users.models import Address  # Make sure to import the Address model

class CommentModelTests(TestCase):

    def setUp(self):
        self.user = UserProfile.objects.create(username='user1')

        # Creating an address object to assign to the charger
        self.address = Address.objects.create(
            street_address='123 Test St',
            lat='12.3456789012345',
            lng='54.3210987654321',
            suburb='Test Suburb',
            post_code='1234567',
            country='Test Country'
        )

        self.charger = Charger.objects.create(name='charger1', address=self.address)
        self.comment = Comment.objects.create(user=self.user, charger=self.charger, contents='Test comment')

    def test_comment_creation(self):
        """
        Test whether the Comment instance is correctly created and saved in the database.
        """
        self.assertTrue(isinstance(self.comment, Comment))
        self.assertEqual(self.comment.contents, 'Test comment')
        self.assertEqual(self.comment.user.username, 'user1')
        self.assertEqual(self.comment.charger.name, 'charger1')

    def test_string_representation(self):
        """
        Test the string representation of the Comment model.
        """
        self.assertEqual(str(self.comment), f"Comment by {self.comment.user.username} on {self.comment.charger.name}")

    def test_comment_ordering(self):
        """
        Test the ordering of comments based on the date.
        """
        comment2 = Comment.objects.create(user=self.user, charger=self.charger, contents='Another comment')
        comments = Comment.objects.all()
        self.assertTrue(comments[0].date < comments[1].date)

