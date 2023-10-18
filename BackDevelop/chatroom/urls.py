from django.urls import path
from . import views

urlpatterns = [
    path('get_chatroom/', views.get_chatroom, name='get_chatroom'),
    path('get_user_chatlogs/<str:username>/', views.get_user_chatlogs, name='get_user_chatlogs'),
    path('save_chatlog/', views.save_chatlog, name='save_chatlog'),
    path('get_user_chatrooms/<str:username>/', views.get_user_chatrooms, name='get_user_chatrooms'),


]
