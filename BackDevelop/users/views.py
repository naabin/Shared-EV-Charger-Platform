from rest_framework import viewsets, status, parsers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status

from .swagger_schema import SwaggerLoginSchema
from .models import UserProfile
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    # parser_classes = [parsers.MultiPartParser]

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAuthenticated,]
        elif self.action in ['create', 'list', 'retrieve']:
            self.permission_classes = [AllowAny,]
        return super().get_permissions()

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh-token': str(refresh),
                'access-token': str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = UserProfile.objects.order_by('date_joined')
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class AuthViewSet(viewsets.GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['login']:
            self.permission_classes = [AllowAny,]
        elif self.action in ['logout']:
            self.permission_classes = [IsAuthenticated,]
        return super().get_permissions()

    @swagger_auto_schema(method='post', request_body=SwaggerLoginSchema.login_schema, responses=SwaggerLoginSchema.login_schema_response)
    @action(detail=False, methods=['post'], url_name='login')
    def login(self, request):
        user_email = request.data.get('email')
        password = request.data.get('password')
        user = UserProfile.objects.filter(email=user_email).first()
        if user is not None:
            if user_email is None or user.check_password(user.check_password(password)):
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            token = RefreshToken.for_user(user=user)
            return Response({
                'refresh': str(token),
                'access': str(token.access_token),
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    @swagger_auto_schema(method='post', request_body=SwaggerLoginSchema.logout_schema, responses=SwaggerLoginSchema.logout_schema_response)
    @action(detail=False, methods=['post'], url_name='logout')
    def logout(self, request):
        # print(request.META['HTTP_AUTHORIZATION'])
        # refresh_token = request.META['HTTP_AUTHORIZATION']
        refresh_token = request.data.get('refresh_token')
        print(refresh_token)
        if refresh_token:
            try:
                RefreshToken(refresh_token).blacklist()
                return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'message': 'Invalid token or token has already expired'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Refresh token is required'}, status=status.HTTP_401_UNAUTHORIZED)
