from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Charger
from .serializers import ChargerSerializer


class ChargerViewSet(viewsets.ModelViewSet):
    queryset = Charger.objects.all()
    serializer_class = ChargerSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = ChargerSerializer(data=request.data)
        if serializer.is_valid():
            charger = serializer.save()
            return Response({'charger': ChargerSerializer(charger).data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=['get'], detail=False, permission_classes=[IsAuthenticated])
    def get_charger_by_renter_id(self, request):
        renter_id = request.query_params.get('renter')
        if renter_id is not None:
            chargers = Charger.objects.filter(renter=renter_id)
            if (len(chargers) > 0):
                return Response(ChargerSerializer(chargers).data, status=status.HTTP_200_OK)
            return Response([], status=status.HTTP_200_OK)
        return Response({'message':'Could not find any chargers associated with this renter'},status=status.HTTP_404_NOT_FOUND)


    def perform_create(self, serializer):
        return serializer.save()