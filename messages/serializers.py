from rest_framework import serializers
from .models import Message
from clients.serializers import ClientSerializerWithoutPassword


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('timestamp', 'chat', 'from_user', 'message')


class MessageSerializerFull(serializers.ModelSerializer):
    from_user_full = ClientSerializerWithoutPassword(source='from_user')

    class Meta:
        model = Message
        fields = ('timestamp', 'chat', 'from_user_full', 'message')