from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

from ..models import Auction
from core.tasks import start_auction

@receiver(pre_save, sender=Auction)
def capture_old_status(sender, instance, **kwargs):
    if instance.pk:
        try:
            original_instance = Auction.objects.get(pk=instance.pk)
            instance._old_status = original_instance.status  # Store original status
        except Auction.DoesNotExist:
            pass

@receiver(post_save, sender=Auction)
def schedule_auction_task(sender, instance, created, **kwargs):
    if not created:  
        old_status = getattr(instance, '_old_status', None)
        new_status = instance.status  # Get the new status

        if old_status == 'pending' and new_status == 'draft':
            start_auction.apply_async((instance.pk,), eta=instance.start_time)