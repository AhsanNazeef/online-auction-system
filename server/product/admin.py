from django.contrib import admin
from .models import Product, ProductImage

@admin.register(Product)
class CollectionAdmin(admin.ModelAdmin):
    search_fields = ['name', 'description']

@admin.register(ProductImage)
class CollectionAdmin(admin.ModelAdmin):
    pass