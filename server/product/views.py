from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated

from core.pagination import DefaultPagination
from .serializers import ProductImageSerializer, ProductSerializer
from .models import Product, ProductImage



class ProductViewSet(ModelViewSet):
    queryset = Product.objects.prefetch_related('images').all()
    serializer_class = ProductSerializer
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status']
    search_fields = ['name', 'description']
    permission_classes = [IsAuthenticated]
    
class ProductImagesViewSet(ModelViewSet):
    serializer_class = ProductImageSerializer
    pagination_class = DefaultPagination
    
    def get_serializer_context(self):
        return {'product_id': self.kwargs['product_pk']}

    def get_queryset(self):
        return ProductImage.objects \
                .filter(product_id=self.kwargs['product_pk']) \
               
