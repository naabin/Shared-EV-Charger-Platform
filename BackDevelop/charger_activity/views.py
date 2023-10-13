from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from .models import ChargerActivity
from .serializers import ChargerActivitySerializer

class ChargerActivityViewSet(viewsets.ModelViewSet):
    queryset = ChargerActivity.objects.all()
    serializer_class = ChargerActivitySerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = ChargerActivitySerializer(data=request.data)
        if serializer.is_valid():
            charger_activity = serializer.save()
            return Response({
                'charger-activity': ChargerActivitySerializer(charger_activity).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


