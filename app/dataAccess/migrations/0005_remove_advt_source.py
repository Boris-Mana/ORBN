# Generated by Django 3.1.7 on 2022-03-08 06:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dataAccess', '0004_transfer_source'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='advt',
            name='source',
        ),
    ]