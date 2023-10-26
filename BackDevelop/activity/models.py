from django.db import models
from users.models import UserProfile
from charger.models import Charger
# Create your models here.


class Activity(models.Model):
    approve = models.BooleanField(default=False)
    state = models.CharField(max_length=20)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    duration = models.IntegerField(default=0)
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name='user')
    owner = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name='owner', null=True)
    charger = models.ForeignKey(Charger, on_delete=models.CASCADE)
    total_price = models.DecimalField(
        max_digits=5, decimal_places=2, default=0)
