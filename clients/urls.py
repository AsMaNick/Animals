from django.urls import path
from clients import views

urlpatterns = [
    path('api/clients/', views.client_list),
    path('api/check_client/', views.check_client),
    path('api/clients/<int:pk>/', views.client_detail),
]