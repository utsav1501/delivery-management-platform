from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES=(
        ('CUSTOMER', 'Customer'),
        ('DRIVER', 'Driver'),
        ('ADMIN', 'Admin'),
    )
    
    role=models.CharField(max_length=100,choices=ROLE_CHOICES)
    phone_number=models.CharField(max_length=15,unique=False)
    
    def __str__(self):
        return self.username
