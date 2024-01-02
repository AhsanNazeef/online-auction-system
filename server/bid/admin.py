from django.contrib import admin

from bid.models import Bid

@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    search_fields = ('user', 'item', 'amount')
    list_per_page = 25
