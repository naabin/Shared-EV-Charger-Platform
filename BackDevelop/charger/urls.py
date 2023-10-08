from rest_framework import routers
from .views import ChargerViewSet

router = routers.DefaultRouter()
router.register(r'', ChargerViewSet, basename='api')

urlpatterns = router.urls
