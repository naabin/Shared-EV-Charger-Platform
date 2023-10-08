from rest_framework import serializers
from .models import UserProfile, Address, Role


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    role = RoleSerializer()

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'role',
                  'address', 'first_name', 'last_name', 'password', 'image']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        role_data = validated_data.pop('role')
        address = Address.objects.create(**address_data)
        role = Role.objects.create(**role_data)
        user = UserProfile.objects.create(
            address=address, role=role, **validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
