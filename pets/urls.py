from django.urls import path
from pets import views

urlpatterns = [
    path('api/pets/', views.all_pets_list),
    path('api/clients/<int:pk>/pets/', views.pets_list),
    path('api/pets/<int:pk>/', views.pets_detail),
    path('api/pets/<int:pk>/logs/', views.pet_logs),
]