from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    email = models.EmailField(unique=True)
    
class UserProfile(models.Model):
    USER_TYPES = [
        ('admin', 'Admin'),
        ('seller', 'Seller'),
        ('buyer', 'Buyer'),
    ]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=10, choices=USER_TYPES, default='buyer')

    def __str__(self):
        return self.user.username
    