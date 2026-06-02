from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Delivery
from .serializers import DeliverySerializer
from .permissions import IsCustomer, IsDriver


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsCustomer])
def create_delivery(request):
    serializer = DeliverySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(customer=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def delivery_list(request):
    user = request.user
    if user.role == "CUSTOMER":
        deliveries = Delivery.objects.filter(customer=user)
    elif user.role == "DRIVER":
        deliveries = Delivery.objects.filter(driver=user)
    else:
        deliveries = Delivery.objects.all()

    serializer = DeliverySerializer(deliveries, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsDriver])
def pending_deliveries(request):
    deliveries = Delivery.objects.filter(status="PENDING", driver__isnull=True)
    serializer = DeliverySerializer(deliveries, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsDriver])
def accept_delivery(request, delivery_id):
    try:
        delivery = Delivery.objects.get(id=delivery_id)
    except Delivery.DoesNotExist:
        return Response(
            {"error": "Delivery not found"}, status=status.HTTP_404_NOT_FOUND
        )

    if delivery.driver is not None:
        return Response(
            {"error": "Delivery already accepted"}, status=status.HTTP_404_NOT_FOUND
        )
    delivery.driver = request.user
    delivery.status = "ACCEPTED"
    delivery.save()

    serializer = DeliverySerializer(delivery)
    return Response(serializer.data)


@api_view(["Patch"])
@permission_classes([IsAuthenticated, IsDriver])
def update_delivery_status(request, delivery_id):
    try:
        delivery = Delivery.objects.get(id=delivery_id, driver=request.user)

    except Delivery.DoesNotExist:
        return Response(
            {"error": "Delivery Not Found"}, status=status.HTTP_404_NOT_FOUND
        )

    new_status = request.data.get("status")

    allowed_Status = ["PICKED_UP", "IN_TRANSIT", "DELIVERED", "CANCELLED"]

    if new_status not in allowed_Status:
        return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

    delivery.status = new_status
    delivery.save()
    serializer = DeliverySerializer(delivery)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCustomer])
def customer_deliveries(request):
    user = request.user
    deliveries = Delivery.objects.filter(customer=user)
    serializer = DeliverySerializer(deliveries, many=True)
    return Response(serializer.data)
