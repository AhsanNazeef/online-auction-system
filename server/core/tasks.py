from celery import shared_task
from auction.models import Auction
from django.utils import timezone

@shared_task
def start_auction(auction_id):
    try:
        auction = Auction.objects.get(pk=auction_id)
        current_time = timezone.now()
        if current_time >= auction.start_time and auction.status == 'draft':
            auction.status = 'live'
            auction.save()
            stop_auction.apply_async((auction_id,), eta=auction.end_time)
        else:
            print("There was an error starting the auction")
    except Auction.DoesNotExist:
        print("Auction does not exist")
    
@shared_task
def stop_auction(auction_id):
    try:
        auction = Auction.objects.get(pk=auction_id)
        current_time = timezone.now()
        if current_time >= auction.end_time and auction.status == 'live':
            auction.status = 'closed'
            auction.save()
        else:
            print("There was an error stopping the auction")
            
    except Auction.DoesNotExist:
        print("Auction does not exist")
