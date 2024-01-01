from rest_framework.viewsets import ModelViewSet

from core.pagination import DefaultPagination
from .serializers import AuctionSerializer, CreateAuctionSerializer, UpdateAuctionSerializer
from .models import Auction


class AuctionViewSet(ModelViewSet):
    queryset = Auction.objects.all()
    pagination_class = DefaultPagination
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateAuctionSerializer
        if self.request.method in ['PUT', 'PATCH']:
            return UpdateAuctionSerializer
        return AuctionSerializer           
