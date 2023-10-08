from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, AuthViewSet
from .views import *

router = routers.DefaultRouter()
router.register(r'', UserViewSet, basename='user')  # Comment this out temporarily
router.register(r'auth', AuthViewSet, basename='auth')
urlpatterns = router.urls

