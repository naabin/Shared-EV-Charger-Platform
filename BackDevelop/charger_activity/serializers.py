from rest_framework import serializers
from charger.serializers import UserIdSerializer
from charger.models import Charger
from users.models import UserProfile
from .models import ChargerActivity


class ChargerIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Charger
        fields = ['id']


class ChargerActivitySerializer(serializers.ModelSerializer):
    # charger = ChargerIdSerializer()
    # user = UserIdSerializer()

    class Meta:
        model = ChargerActivity
        fields = '__all__'

    def create(self, validated_data):
        charger = validated_data.pop('charger')
        user = validated_data.pop('user')
        # user = UserProfile.objects.get(id=user_id)
        # print(user)
        # charger = Charger.objects.get(id=charger_id)
        charger_activity = ChargerActivity.objects.create(
            user=user, charger=charger, **validated_data)
        charger_activity.save()
        return charger_activity
