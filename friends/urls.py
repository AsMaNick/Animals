from django.urls import path
from friends import views

urlpatterns = [
    path('api/clients/<int:pk>/friends/', views.friends_list),
]