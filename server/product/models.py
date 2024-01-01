from django.db import models
from django.conf import settings


class Product(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('live', 'Live'),
        ('sold', 'Sold'),
        ('delivered', 'Delivered'),
    ]
    seller = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.TextField()

    def __str__(self):
        return f"Image for Product: {self.product.name}"
