from django.db import models
from users.models import UserProfile
from charger.models import Charger
# Create your models here.


class ChargerActivity(models.Model):
    state = models.CharField(max_length=20)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    duration = models.IntegerField(default=0)
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    charger = models.OneToOneField(Charger, on_delete=models.CASCADE)
    total_price = models.DecimalField(
        max_digits=5, decimal_places=2, default=0)
