import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

# Set Django settings and get ASGI application
os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'
django_asgi_app = get_asgi_application()

# Import your routing only after Django has been initialized
import core.routing as routing

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(routing.websocket_urlpatterns)
    ),
})
