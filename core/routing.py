from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from evcharge import consumers

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
]


application = ProtocolTypeRouter({
    "websocket": URLRouter(websocket_urlpatterns),
})