from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import parser_classes, api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from messages.models import Message
from messages.serializers import MessageSerializer, MessageSerializerFull


@api_view(['GET', 'POST'])
@parser_classes((MultiPartParser, FormParser))
@csrf_exempt
def messages_list(request, pk):
    """
    List all messages of some chat, or create a new message.
    """
    if request.method == 'GET':
        messages = Message.objects.filter(chat=pk)
        serializer = MessageSerializerFull(messages, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        return ''
        data = request.data.copy()
        data['owner'] = pk
        serializer = PetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=200)