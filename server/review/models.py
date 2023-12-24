from django.db import models
from django.conf import settings
from auction.models import Auction


class Review(models.Model):
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    seller = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='seller_reviews', on_delete=models.CASCADE)
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.buyer.username} for {self.seller.username}"
