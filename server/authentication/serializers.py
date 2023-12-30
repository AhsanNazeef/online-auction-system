from rest_framework import serializers
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer
from django.db import transaction

from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user_type']


class UserCreateSerializer(BaseUserCreateSerializer):
    USER_TYPES = [
        ('seller', 'Seller'),
        ('buyer', 'Buyer'),
    ]

    user_type = serializers.ChoiceField(choices=USER_TYPES)

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'username', 'password',
                  'email', 'first_name', 'last_name', 'user_type']

    def validate(self, attrs):
        self.user_type = attrs.pop('user_type')
        if self.user_type not in dict(self.USER_TYPES).keys() and self.user_type != 'admin':
            raise serializers.ValidationError("Invalid user type")
        return super().validate(attrs)

    def create(self, validated_data):
        with transaction.atomic():
            user_type = self.user_type
            user = super().create(validated_data)
            UserProfile.objects.create(user=user, user_type=user_type)
            user.user_type = user_type
            return user


class UserSerializer(BaseUserSerializer):
    userprofile = UserProfileSerializer(read_only=True)
    email = serializers.EmailField(read_only=True)

    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'username', 'email',
                  'first_name', 'last_name', 'userprofile']
