from django.db import models
from django.conf import settings

class Driver(models.Model):
    
    VEHICLES_CHOICES=(
        ('BIKE','BIKE'),
        ('CAR','CAR'),
        ('SCOTTER','SCOTTER')
    )
    
    user=models.OneToOneField(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='driver_profile'
    )
    
    vehicle_type=models.CharField(
        max_length=20,
        choices=VEHICLES_CHOICES
    )
    
    vehicle_number=models.CharField(
        max_length=50,
        unique=True
    )
    
    liscence_number=models.CharField(
        max_length=100,
        unique=True
    )
    
    is_online=models.BooleanField(
        default=False
    )
    
    current_latitude=models.FloatField(
        null=True,
        blank=True
    )
    
    current_longitude=models.FloatField(
        null=True,
        blank=True
    )
    
    rating=models.FloatField(
        default=5.0
    )
    
    total_deliveries=models.IntegerField(
        default=0
    )
    
    created_at=models.DateTimeField(
        auto_now_add=True
    )
    
    def __str__(self):
        return self.user.username