from rest_framework import serializers
from .models import LogFromBracelet


class LogFromBraceletSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogFromBracelet
        fields = ('id', 'pet', 'timestamp', 'temperature', 'pulse')
