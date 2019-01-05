from django.urls import path
from pets import views

urlpatterns = [
    path('api/clients/<int:pk>/pets/', views.pets_list),
    path('api/pets/<int:pk>/', views.pets_detail),
]