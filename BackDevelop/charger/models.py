from django.db import models
from users.models import Address, UserProfile
from django_s3_storage.storage import S3Storage

storage = S3Storage(aws_s3_bucket_name="evcharger-bucket")


class ChargerImage(models.Model):
    name = models.CharField(max_length=15)
    image = models.ImageField(storage=storage)


class ChargerType(models.Model):
    name = models.CharField(max_length=50)
    image = models.ForeignKey(
        ChargerImage, on_delete=models.CASCADE, null=True)
    brand = models.CharField(max_length=50)
    power = models.DecimalField(decimal_places=5, max_digits=10, null=True)
    port_type = models.CharField(max_length=20, null=True)
    amp = models.DecimalField(decimal_places=5, max_digits=10, null=True)
    warranty = models.IntegerField(null=True)


class Charger(models.Model):
    name = models.CharField(max_length=15, null=True)
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE, verbose_name='location')
    renter = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, null=True)
    charger_type = models.ForeignKey(
        ChargerType, on_delete=models.CASCADE, verbose_name='charger_type')
    number_of_stars = models.IntegerField()
    number_of_rating = models.DecimalField(max_digits=3, decimal_places=1)
