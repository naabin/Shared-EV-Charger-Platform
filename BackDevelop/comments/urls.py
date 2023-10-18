from rest_framework import routers
from .views import CommentViewset

router = routers.DefaultRouter()
router.register(r'', CommentViewset, basename='comment')
urlpatterns = router.urls