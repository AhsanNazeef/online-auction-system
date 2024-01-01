from .views import AuctionViewSet
from bid.views import BidViewSet
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register('', AuctionViewSet, basename='auction')

auction_router = routers.NestedDefaultRouter(router, '', lookup='auction')
auction_router.register('bids', BidViewSet, basename='auction-bids')

urlpatterns = router.urls + auction_router.urls
