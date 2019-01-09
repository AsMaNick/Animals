from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import parser_classes, api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from clients.models import Client
from clients.serializers import ClientSerializerWithoutPassword
from .models import Friend
from .serializers import FriendSerializer


@api_view(['GET', 'POST'])
@parser_classes((JSONParser,))
@csrf_exempt
def friends_list(request, pk):
    """
    List all pets of some client, or create a new pet.
    """
    if request.method == 'GET':
        friends = Client.objects.filter(id__in=[friend.friend.id for friend in Friend.objects.filter(creator=pk)])
        serializer = ClientSerializerWithoutPassword(friends, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data.copy()
        data['creator'] = pk
        serializer = FriendSerializer(data=data)
        if serializer.is_valid():
            friend = Friend.objects.filter(creator=data['creator'], friend=data['friend'])
            if len(friend) == 0:
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            else:
                friend[0].delete()
                return JsonResponse({}, status=204)
        return JsonResponse(serializer.errors, status=200)
