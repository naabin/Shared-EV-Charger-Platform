from rest_framework import viewsets, status, parsers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from django.http import JsonResponse
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
            self.permission_classes = [IsAuthenticated, ]
        elif self.action in ['create', 'list', 'retrieve']:
            self.permission_classes = [AllowAny, ]
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

    @action(methods=['get'], detail=False, permission_classes=[AllowAny])
    def get_user_by_username(self, request):
        username = request.query_params.get('username')
        try:
            user = UserProfile.objects.get(username=username)

            return Response({'message': 'Username already exists'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, permission_classes=[AllowAny])
    def get_user_by_itsname(request):
        username = request.GET.get('username')
        if not username:
            return JsonResponse({"error": "Username parameter is missing."}, status=400)

        try:
            user = UserProfile.objects.get(username=username)
            token = RefreshToken.for_user(user=user)
            username_from_db = user.username
            id_from_db = user.id
            return JsonResponse({
                "id": id_from_db,
                "username": username_from_db,
            }, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return JsonResponse({"error": "User not found."}, status=404)

    @action(methods=['get'], detail=False, permission_classes=[AllowAny])
    def get_user_by_email(self, request):
        user_email = request.query_params.get('email')
        if user_email is not None and len(user_email) > 0:
            user = UserProfile.objects.filter(email=user_email)
            if not (user.exists()):
                return Response(status=status.HTTP_200_OK)
            return Response({'message': 'Email already exists'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        return Response(status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        queryset = UserProfile.objects.order_by('date_joined')
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class AuthViewSet(viewsets.GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['login']:
            self.permission_classes = [AllowAny, ]
        elif self.action in ['logout']:
            self.permission_classes = [IsAuthenticated, ]
        return super().get_permissions()

    @swagger_auto_schema(method='post', request_body=SwaggerLoginSchema.login_schema,
                         responses=SwaggerLoginSchema.login_schema_response)
    @action(detail=False, methods=['post'], url_name='login')
    def login(self, request):
        user_email = request.data.get('email')
        password = request.data.get('password')

        user = UserProfile.objects.filter(email=user_email).first()
        if user is not None:
            if user_email is None or not user.check_password(password):
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            token = RefreshToken.for_user(user=user)
            username_from_db = user.username
            id_from_db = user.id
            print(id_from_db, username_from_db)
            return Response({
                'refresh': str(token),
                'access': str(token.access_token),
                'username': username_from_db,
                'id': id_from_db
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    @swagger_auto_schema(method='post', request_body=SwaggerLoginSchema.logout_schema,
                         responses=SwaggerLoginSchema.logout_schema_response)
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
                return Response({'message': 'Invalid token or token has already expired'},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Refresh token is required'}, status=status.HTTP_401_UNAUTHORIZED)
