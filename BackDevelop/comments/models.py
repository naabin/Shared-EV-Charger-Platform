from django.db import models
from users.models import UserProfile
from charger.models import Charger

class Comment(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, unique=True)
    contents = models.CharField(max_length=1000, null=True)
    charger = models.ForeignKey(Charger, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
