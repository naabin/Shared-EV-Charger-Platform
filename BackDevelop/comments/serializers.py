from rest_framework import serializers
from charger_activity.serializers import ChargerIdSerializer
from charger.serializers import UserIdSerializer

from charger.models import Charger
from users.models import UserProfile
from .models import Comment

class ChargerIdForCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Charger
        fields = ['id']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
    
    def create(self, validated_data):
        user = validated_data.pop('user')
        charger = validated_data.pop('charger')
        user = UserProfile.objects.get(id=user.id)
        charger = Charger.objects.get(id=charger.id)
        comment= Comment.objects.create(user=user, charger=charger, **validated_data)
        comment.save()
        return comment