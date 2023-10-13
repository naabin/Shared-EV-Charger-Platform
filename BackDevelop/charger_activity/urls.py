from rest_framework import routers

from .views import ChargerActivityViewSet

router = routers.DefaultRouter()
router.register(r'', ChargerActivityViewSet, basename='charger-activity')
urlpatterns = router.urls