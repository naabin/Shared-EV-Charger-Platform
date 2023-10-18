from rest_framework import serializers
from .models import Charger, ChargerType, ChargerImage
from django.core.exceptions import ObjectDoesNotExist
from users.models import Address, UserProfile
from users.serializers import AddressSerializer, UserSerializer
from drf_extra_fields.fields import Base64ImageField


class ChargerImageSerializer(serializers.ModelSerializer):
    image = Base64ImageField()
    class Meta:
        model = ChargerImage
        fields = '__all__'
    def create(self, validated_data):
        image = ChargerImage.objects.create(**validated_data)
        image.save()
        return image


class ChargerTypeSerializer(serializers.ModelSerializer):
    image = ChargerImageSerializer()

    class Meta:
        model = ChargerType
        fields = '__all__'

    def create(self, validated_data):
        image_data = validated_data.pop('image')
        image = ChargerImage.objects.create(**image_data)
        charger_type = ChargerType.objects.create(
            image=image, **validated_data)
        charger_type.save()
        return charger_type



class ChargerTypeSerializer(serializers.ModelSerializer):
    image = ChargerImageSerializer()
    class Meta:
        model = ChargerType
        fields = '__all__'

    def create(self, validated_data):
        charger_type = ChargerType.objects.create(**validated_data)
        charger_type.save()
        return charger_type


class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id']


class ChargerSerializer(serializers.ModelSerializer):
    charger_type = ChargerTypeSerializer()
    address = AddressSerializer()
    # chargerImage = ChargerImageSerializer()
    user = UserIdSerializer

    class Meta:
        model = Charger
        fields = '__all__'

    def create(self, validated_data):
        renter = validated_data.pop('renter')
        charger_type = validated_data.pop('charger_type')
        address = validated_data.pop('address')
        image = ChargerImageSerializer()
        try:
            address = Address.objects.get(id=address.get('id'))
        except ObjectDoesNotExist:
            address = Address.objects.create(**address)
        else:
            validated_data['address'] = address
        image_data = charger_type.pop('image')
        image = image_data.pop('image')
        charger_image = ChargerImage.objects.create(image=image, **image_data)
        charger_type = ChargerType.objects.create(image=charger_image, **charger_type)
        renter = UserProfile.objects.get(username=renter)
        charger = Charger.objects.create(
            address=address, renter=renter, charger_type=charger_type, **validated_data)
        charger.save()
        return charger
