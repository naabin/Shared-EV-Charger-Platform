from rest_framework import serializers
from charger_activity.serializers import ChargerIdSerializer
from charger.serializers import UserIdSerializer

from charger.models import Charger
from users.models import UserProfile
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    charger = ChargerIdSerializer()
    user = UserIdSerializer()
    class Meta:
        model = Comment
        fields = '__all__'
    
    def create(self, validated_data):
        user_id = validated_data.pop('user')
        charger_id = validated_data.pop('charger')
        user = UserProfile.objects.get(id=user_id)
        charger = Charger.objects.get(id=charger_id)
        comment= Comment.objects.create(user=user, charger=charger, **validated_data)
        comment.save()
        return comment