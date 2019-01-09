from rest_framework import serializers
from .models import Chat
from clients.serializers import ClientSerializerWithoutPassword
from messages.serializers import MessageSerializer, MessageSerializerFull


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('first_user', 'second_user')


class ChatSerializerWithId(serializers.ModelSerializer):
    first_user_full = ClientSerializerWithoutPassword(source='first_user')
    second_user_full = ClientSerializerWithoutPassword(source='second_user')
    messages = MessageSerializerFull(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ('id', 'first_user_full', 'second_user_full', 'messages')