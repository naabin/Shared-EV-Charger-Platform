from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class CustomUser(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)

    def set_password(self, password):
        self.password = make_password(password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)


