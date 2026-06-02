from django.db import models
from django.conf import settings

class Delivery(models.Model):
    STATUS_CHOICES=(
        ('PENDING','Pending'),
        ('ACCEPTED','Accepted'),
        ('PICKED_UP','Piked UP'),
        ('IN_TRANSIT','IN Transit'),
        ('DELIVERED','Delivered'),
        ('CANCELLED','Cancelled'),
    )
    
    customer=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='customer_deliveries'
    )

    driver=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='driver_deliveries'
    )
    
    pickup_address = models.TextField(default="")
    drop_address = models.TextField(default="")
    
    pickup_latitude=models.FloatField()
    pickup_longitude=models.FloatField()
    
    drop_latitude=models.FloatField()
    drop_longitude=models.FloatField()
    
    price=models.DecimalField(max_digits=10, decimal_places=2)
    
    distance=models.FloatField()
    status=models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )
    
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'Delivery #{self.id}'