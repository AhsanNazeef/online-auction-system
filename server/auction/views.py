from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from core.pagination import DefaultPagination
from .serializers import AuctionSerializer, CreateAuctionSerializer, UpdateAuctionSerializer
from .models import Auction


class AuctionViewSet(ModelViewSet):
    queryset = Auction.objects.all().order_by('-id')
    pagination_class = DefaultPagination
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status']
    search_fields = ['product__name', 'product__description']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateAuctionSerializer
        if self.request.method in ['PUT', 'PATCH']:
            return UpdateAuctionSerializer
        return AuctionSerializer           
