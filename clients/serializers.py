from rest_framework import serializers
from .models import Client


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'registered', 'username', 'name', 'surname', 'address', 'password_hash', 'avatar', 'lat', 'lng')


class ClientSerializerWithoutPassword(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'registered', 'username', 'name', 'surname', 'address', 'avatar', 'lat', 'lng')
