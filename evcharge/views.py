from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser


def home(request):
    if 'username' in request.session:
        return render(request, 'home.html', {'username': request.session['username']})
    return render(request, 'index.html')


@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            user = None

        if user and user.check_password(password):
            # Normally you'd return a token here
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"message": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(username=username).exists():
            return Response({"message": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser(username=username)
        user.set_password(password)
        user.save()

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


def user_logout(request):
    request.session.flush()
    return redirect('login')


def chat_view(request):
    return render(request, 'chat.html')
