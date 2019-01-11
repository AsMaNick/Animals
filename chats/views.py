from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import parser_classes, api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .models import Chat
from .serializers import ChatSerializer, ChatSerializerWithId
from django.db.models import Q


@api_view(['GET', 'POST'])
@parser_classes((JSONParser,))
@csrf_exempt
def chats_list(request, pk):
    """
    List all chats of some client, or create a new chat.
    """
    if request.method == 'GET':
        chats = Chat.objects.filter(Q(first_user=pk) | Q(second_user=pk))
        serializer = ChatSerializerWithId(chats, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data.copy()
        data['first_user'] = pk
        if data['first_user'] > data['second_user']:
            data['first_user'], data['second_user'] = data['second_user'], data['first_user']
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        try:
            chat = Chat.objects.get(Q(first_user=data['first_user']) & Q(second_user=data['second_user']))
            return JsonResponse({'chat_id': chat.id}, status=201)
        except Exception as e:
            return JsonResponse(serializer.errors, status=200)
