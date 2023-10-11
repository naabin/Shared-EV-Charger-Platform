from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Charger
from .serializers import ChargerSerializer


class ChargerViewSet(viewsets.ModelViewSet):
    queryset = Charger.objects.all()
    serializer_class = ChargerSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'create']:
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        charger = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'charger': ChargerSerializer(charger).data}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()