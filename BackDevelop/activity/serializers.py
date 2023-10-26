from rest_framework import serializers
from charger.serializers import UserIdSerializer
from charger.models import Charger
from users.models import UserProfile
from .models import Activity


class ChargerIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Charger
        fields = ['id']


class ActivitySerializer(serializers.ModelSerializer):
    # charger = ChargerIdSerializer()
    # user = UserIdSerializer()

    class Meta:
        model = Activity
        fields = '__all__'

    def create(self, validated_data):
        charger = validated_data.pop('charger')
        user = validated_data.pop('user')
        charger_activity = Activity.objects.create(
            user=user, charger=charger, owner=charger.renter, **validated_data)
        charger_activity.save()
        return charger_activity
