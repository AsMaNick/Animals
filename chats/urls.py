from django.urls import path
from chats import views

urlpatterns = [
    path('api/clients/<int:pk>/chats/', views.chats_list),
]