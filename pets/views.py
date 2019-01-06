from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import parser_classes, api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from pets.models import Pet
from pets.serializers import PetSerializer


def my_parse(request):
    data = dict(request.POST)
    print(data)
    print(request.FILES.keys())
    #data['avatar'] = request.FILE


@api_view(['GET', 'POST'])
@parser_classes((MultiPartParser, FormParser))
@csrf_exempt
def pets_list(request, pk):
    """
    List all pets of some client, or create a new pet.
    """
    if request.method == 'GET':
        print(request.LANGUAGE_CODE)
        pets = Pet.objects.filter(owner=pk)
        serializer = PetSerializer(pets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data
        data['owner'] = pk
        serializer = PetSerializer(data=data)
        if serializer.is_valid():
            #print(serializer.data)
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=200)


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
        data = JSONParser().parse(request)
        serializer = PetSerializer(pet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        pet.delete()
        return HttpResponse(status=204)