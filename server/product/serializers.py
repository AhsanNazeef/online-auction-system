from rest_framework import serializers

from .models import Product, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image')
        
    def create(self, validated_data):
        validated_data['product_id'] = self.context['product_id']
        return super().create(validated_data) 

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    status = serializers.ChoiceField(choices=Product.STATUS_CHOICES, read_only=True)
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'images', 'status', 'created_at', 'updated_at', 'seller')
        read_only_fields = ('created_at', 'updated_at', 'seller')
        
    def create(self, validated_data):
        validated_data['seller_id'] = self.context['user_id']
        return super().create(validated_data) 

