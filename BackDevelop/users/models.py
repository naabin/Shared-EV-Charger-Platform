from django.db import models
from django.contrib.auth.models import AbstractUser
from django_s3_storage.storage import S3Storage


class Role(models.Model):
    role = models.CharField(max_length=10)


class Address(models.Model):
    street_address = models.CharField(max_length=50)
    lat = models.DecimalField(decimal_places=5, max_digits=10, null=True)
    lng = models.DecimalField(decimal_places=5, max_digits=10, null=True)
    suburb = models.CharField(max_length=20)
    post_code = models.CharField(max_length=7)
    country = models.CharField(max_length=12)


storage = S3Storage(aws_s3_bucket_name="evcharger-bucket")


class UserProfile(AbstractUser):
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True)
    image = models.ImageField(storage=storage, null=True)
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE, verbose_name='address', null=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
