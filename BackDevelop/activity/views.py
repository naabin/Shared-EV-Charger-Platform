from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Activity
from .serializers import ActivitySerializer


class ChargerActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = ActivitySerializer(data=request.data)
        if serializer.is_valid():
            charger_activity = serializer.save()
            return Response({
                'charger-activity': ActivitySerializer(charger_activity).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], permission_classes=[IsAuthenticated], detail=False)
    def get_activity_by_owner(self, request):
        owner_id = request.query_params.get('owner')
        if owner_id is not None:
            queryset = Activity.objects.filter(
                owner=owner_id)
            if not queryset.exists():
                queryset = Activity.objects.filter(user=owner_id)
            serializer = ActivitySerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'No activity associated with'}, status=status.HTTP_404_NOT_FOUND)
