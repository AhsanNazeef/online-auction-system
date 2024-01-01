from rest_framework.viewsets import ModelViewSet

from core.pagination import DefaultPagination
from .serializers import BidSerializer
from .models import Bid


class BidViewSet(ModelViewSet):
    http_method_names = ['get', 'post']
    serializer_class = BidSerializer
    pagination_class = DefaultPagination
    
    def get_serializer_context(self):
        return {'auction_id': self.kwargs['auction_pk'], 'user_id' : self.request.user.id}

    def get_queryset(self):
        return Bid.objects \
                .filter(auction_id=self.kwargs['auction_pk']) \
                .select_related('auction')
          
