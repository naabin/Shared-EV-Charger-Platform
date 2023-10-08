from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, AuthViewSet
from .views import *

router = routers.DefaultRouter()
router.register(r'', UserViewSet, basename='user')  # Comment this out temporarily
router.register(r'auth', AuthViewSet, basename='auth')
urlpatterns = router.urls
# urlpatterns = [
#     path('login/', AuthViewSet.login, name='login'),
#     path('register/', UserViewSet.create, name='register'),
#     path('logout/', AuthViewSet.logout, name='logout'),
# ]
# urlpatterns += router.urls
