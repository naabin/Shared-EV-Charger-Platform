# Generated by Django 4.2.6 on 2023-10-23 09:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('charger', '0012_charger_status'),
        ('activity', '0002_activity_approve_activity_owner_activity_viewed_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='charger',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='charger.charger'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL),
        ),
    ]
