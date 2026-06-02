from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Driver
from .serializers import DriverSerializer
from .permissions import IsDriver


# Creating profile of driver
@api_view(["POST"])
@permission_classes([IsAuthenticated, IsDriver])
def create_driver_profile(request):

    if hasattr(request.user, "driver_profile"):
        return Response(
            {"error": "Driver profile already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    serializer = DriverSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsDriver])
def get_driver_profile(request):

    try:
        driver = Driver.objects.get(user=request.user)
    except Driver.DoesNotExist:
        return Response(
            {"error": "Driver doesnot exist"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer=DriverSerializer(driver)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated,IsDriver])
def update_online_status(request):
    try:
        driver=Driver.objects.get(
            user=request.user
        )
    except Driver.DoesNotExist:
        return Response(
            {'error':'Driver profile not found'}
            ,status=status.HTTP_404_NOT_FOUND
        )
        
    
    driver.is_online=request.data.get('is_online')
    driver.save()
    serializer=DriverSerializer(driver)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated,IsDriver])
def update_location(request):
    try:
        driver=Driver.objects.get(
            user=request.user
        )
    except:
        Driver.DoesNotExist(
            {'error':'Driver doesnot exist'},
            status=status.HTTP_404_NOT_FOUND
            )
        
    latitude=request.data.get('current_latitude')
    longitude=request.data.get('current_longitude')
    
    driver.current_latitude=latitude
    driver.current_longitude=longitude
    
    driver.save()
    
    serializer=DriverSerializer(driver)
    return Response(serializer.data)

