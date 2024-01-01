from django.db import models
from product.models import Product


class Auction(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('draft', 'Draft'),
        ('live', 'Live'),
        ('closed', 'Closed'),
    ]
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    minimum_bid = models.PositiveIntegerField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending')
    
    def __str__(self):
        return f"Auction for {self.product.product_name}"
