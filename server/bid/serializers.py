from rest_framework import serializers
from django.utils import timezone

from authentication.serializers import UserSerializer
from auction.models import Auction
from .models import Bid

class BidSerializer(serializers.ModelSerializer):
    bidder = UserSerializer(read_only=True)
    class Meta:
        model = Bid
        fields = ('id', 'bidder', 'bid_amount', 'timestamp', 'auction')
        read_only_fields = ('bidder', 'auction')
    
    def unique_error_message(self, model_class, unique_check):
        return super().unique_error_message(model_class, unique_check)

    def validate(self, attrs):
        bid_amount = attrs['bid_amount']
        auction_id = self.context['auction_id']
        auction = Auction.objects.get(id=auction_id)
        bid_with_user = Bid.objects.filter(bidder_id=self.context['user_id'], auction_id=auction_id)
        now = timezone.now()
        
        if auction.status != 'live':
            raise serializers.ValidationError("Auction is not open for bidding")
        if auction.start_time > now:
            raise serializers.ValidationError("Auction has not started yet")
        if auction.end_time < now:
            raise serializers.ValidationError("Auction has already ended")
        if bid_amount < auction.minimum_bid:
            raise serializers.ValidationError("Bid amount cannot be less than minimum bid amount")
        
        return super().validate(attrs) 
    
    def create(self, validated_data):
        validated_data['bidder_id'] = self.context['user_id']
        validated_data['auction_id'] = self.context['auction_id']
        return super().create(validated_data) 
