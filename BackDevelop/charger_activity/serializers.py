from rest_framework import serializers
from charger.serializers import UserIdSerializer
from charger.models import Charger
from users.models import UserProfile
from .models import ChargerActivity

class ChargerIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Charger
        fields = ['id', 'name']


class ChargerActivitySerializer(serializers.ModelSerializer):
    charger = ChargerIdSerializer()
    user = UserIdSerializer()

    class Meta:
        model = ChargerActivity
        fields = '__all__'
    
    def create(self, validated_data):
        charger_id = validated_data.pop('charger')
        user_id = validated_data.pop('user')
        try:
            user = UserProfile.objects.get(id = user_id)
            charger = Charger.objects.get(id = charger_id)
            charger_activity = ChargerActivity.objects.create(user=user, charger=charger, **validated_data)
            charger_activity.save()
            return charger_activity
        except:
            raise serializers.ValidationError()
            