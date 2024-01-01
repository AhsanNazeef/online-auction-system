# Generated by Django 5.0 on 2023-12-31 11:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0001_initial'),
        ('product', '0004_rename_product_name_product_name_product_created_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='auction',
            name='auto_bidding_enabled',
        ),
        migrations.AddField(
            model_name='auction',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('draft', 'Draft'), ('live', 'Live'), ('closed', 'Closed')], default='pending', max_length=20),
        ),
        migrations.AlterField(
            model_name='auction',
            name='minimum_bid',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='auction',
            name='product',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='product.product'),
        ),
    ]
