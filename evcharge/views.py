from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from rest_framework import status


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello World. Do you want to charge your EV'})


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        login(request, user)
        return Response({'message': 'Logged in successfully!'}, status=status.HTTP_200_OK)

    return Response({'message': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            return Response({'message': 'Registration successful!'}, status=status.HTTP_201_CREATED)

        errors = form.errors.as_json()
        return Response({'message': 'Registration failed!', 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Invalid request method!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        return Response({'message': 'Logged out successfully!'}, status=status.HTTP_200_OK)

    return Response({'message': 'No user was logged in!'}, status=status.HTTP_400_BAD_REQUEST)
