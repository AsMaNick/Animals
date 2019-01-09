from django.urls import path
from messages import views

urlpatterns = [
    path('api/chats/<int:pk>/messages/', views.messages_list),
]