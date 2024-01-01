from rest_framework import serializers
from django.utils import timezone

from .models import Auction
from product.serializers import ProductSerializer


class BaseAuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = ('id', 'product', 'start_time', 'end_time', 'minimum_bid', 'status')
        read_only_fields = ['status', 'product']

    def validate(self, attrs):
        validated_attrs = super().validate(attrs) 
        return self.validate_start_end_dates(validated_attrs)
    
    def validate_start_end_dates(self, attrs):
        start_date = attrs.get('start_time')
        end_date = attrs.get('end_time')
        now = timezone.now()

        if start_date and end_date:
            if start_date < now:
                raise serializers.ValidationError(
                    "Start date must be today or later.")
            if start_date >= end_date:
                raise serializers.ValidationError(
                    "Start date must be before the end date.")
        return attrs


class AuctionSerializer(BaseAuctionSerializer):
    product = ProductSerializer(read_only=True)
    class Meta(BaseAuctionSerializer.Meta):
        pass


class CreateAuctionSerializer(BaseAuctionSerializer):
    class Meta(BaseAuctionSerializer.Meta):
        read_only_fields = ['status']


class UpdateAuctionSerializer(BaseAuctionSerializer):
    class Meta(BaseAuctionSerializer.Meta):
        read_only_fields = ['status', 'product']

