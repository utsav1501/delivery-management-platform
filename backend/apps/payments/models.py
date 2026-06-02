from django.db import models
from django.conf import settings

from apps.deliveries.models import Delivery


class Payment(models.Model):

    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
    )

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    delivery = models.ForeignKey(
        Delivery,
        on_delete=models.CASCADE
    )

    razorpay_order_id = models.CharField(
        max_length=255
    )

    razorpay_payment_id = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )

    razorpay_signature = models.CharField(
        max_length=500,
        null=True,
        blank=True
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.razorpay_order_id