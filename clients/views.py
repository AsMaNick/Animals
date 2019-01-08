from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.decorators import parser_classes, api_view
from clients.models import Client
from clients.serializers import ClientSerializer, ClientSerializerWithoutPassword


def calc_hash(s):
    res = 0
    for c in s:
        res = (res * 997 + ord(c)) % (1 << 30)
    return res


@csrf_exempt
def client_list(request):
    """
    List all clients, or create a new client.
    """
    if request.method == 'GET':
        clients = Client.objects.all()
        serializer = ClientSerializerWithoutPassword(clients, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        if 'password_hash' in data:
            data['password_hash'] = calc_hash(data['password_hash'])
        serializer = ClientSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=200)


@csrf_exempt
def check_client(request):
    if request.method == 'GET':
        return JsonResponse({}, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        if 'password' in data and 'username' in data:
            password_hash = calc_hash(data['password'])
            username = data['username']
            try:
                client = Client.objects.get(username=username)
                print(client.password_hash, password_hash)
                serializer = ClientSerializerWithoutPassword(client)
                return JsonResponse({'ok': client.password_hash == password_hash, 'client': serializer.data}, status=200)
            except Exception:
                pass
        return JsonResponse({'ok': False}, status=200)


@api_view(['GET', 'PATCH', 'DELETE'])
@parser_classes((MultiPartParser, FormParser,))
@csrf_exempt
def client_detail(request, pk):
    """
    Retrieve, update or delete a client.
    """
    try:
        client = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ClientSerializerWithoutPassword(client)
        return JsonResponse(serializer.data)

    elif request.method == 'PATCH':
        data = request.data
        serializer = ClientSerializer(client, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=200)

    elif request.method == 'DELETE':
        client.delete()
        return HttpResponse(status=204)