from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from rest_framework import status

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    phone_number=request.data.get('phone_number')
    password = request.data.get('password')
    role = request.data.get('role')
    
    # check existing username
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
        
    #create User
    user=User.objects.create_user(
        username=username,
        email=email,
        phone_number=phone_number,
        password=password,
        role=role
    )
    
    return Response({
        'message':'User created Successfully',
        'username':user.username,
        'phone_number':phone_number,
        'email':user.email,
        'role':user.role
    },status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'role': user.role,
        })

    return Response(
        {'error': 'Invalid credentials'},
        status=400
    )