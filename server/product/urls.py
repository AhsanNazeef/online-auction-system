from . import views
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register('', views.ProductViewSet, basename='products')

products_router = routers.NestedDefaultRouter(router, '', lookup='product')
products_router.register('images', views.ProductImagesViewSet, basename='product-images')
# URLConf
urlpatterns = router.urls + products_router.urls
