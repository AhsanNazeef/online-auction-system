from django.conf import Settings
from django.db import models
from auction.models import Auction


class Bid(models.Model):
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)
    bidder = models.ForeignKey(
        Settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bid of {self.bid_amount} by {self.bidder.username} on {self.auction.product.product_name}"
