from django.contrib import admin
from .models import Auction

@admin.register(Auction)
class CollectionAdmin(admin.ModelAdmin):
    list_select_related = ['product']
    search_fields = ['product__name', 'product__description']