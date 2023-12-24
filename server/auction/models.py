from django.db import models
from product.models import Product


class Auction(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    minimum_bid = models.DecimalField(max_digits=10, decimal_places=2)
    auto_bidding_enabled = models.BooleanField(default=False)

    def __str__(self):
        return f"Auction for {self.product.product_name}"
