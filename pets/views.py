from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import parser_classes, api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from pets.models import Pet
from logs_from_bracelet.models import LogFromBracelet
from pets.serializers import PetSerializer
from logs_from_bracelet.serializers import LogFromBraceletSerializer


@api_view(['GET', 'POST'])
@parser_classes((MultiPartParser, FormParser))
@csrf_exempt
def pets_list(request, pk):
    """
    List all pets of some client, or create a new pet.
    """
    if request.method == 'GET':
        pets = Pet.objects.filter(owner=pk)
        serializer = PetSerializer(pets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data.copy()
        data['owner'] = pk
        serializer = PetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=200)


@api_view(['GET'])
@parser_classes((MultiPartParser, FormParser))
@csrf_exempt
def all_pets_list(request):
    """
    List all pets
    """
    pets = Pet.objects.all()
    serializer = PetSerializer(pets, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes((MultiPartParser, FormParser))
@csrf_exempt
def pets_detail(request, pk):
    """
    Retrieve, update or delete a pet.
    """
    try:
        pet = Pet.objects.get(pk=pk)
    except Pet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PetSerializer(pet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = request.data.copy()
        serializer = PetSerializer(pet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=200)

    elif request.method == 'DELETE':
        pet.delete()
        return HttpResponse(status=204)


@api_view(['GET', 'POST'])
@parser_classes((JSONParser,))
@csrf_exempt
def pet_logs(request, pk):
    """
    List of all logs, or add log
    """
    if request.method == 'GET':
        logs = LogFromBracelet.objects.filter(pet=pk)
        serializer = LogFromBraceletSerializer(logs, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data.copy()
        data['pet'] = pk
        serializer = LogFromBraceletSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=200)
