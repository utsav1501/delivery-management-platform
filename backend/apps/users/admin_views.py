from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.users.models import User
from apps.users.serializers import RegisterSerializer
from apps.deliveries.models import Delivery
from apps.payments.models import Payment
from apps.deliveries.serializers import DeliverySerializer
from apps.payments.serializers import PaymentSerializer
from django.shortcuts import get_object_or_404

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_stats(request):
    if not request.user.is_staff:
        return Response({"error": "Unauthorized"}, status=403)

    total_users = User.objects.count()
    total_drivers = User.objects.filter(role="DRIVER").count()
    total_deliveries = Delivery.objects.count()
    revenue = Payment.objects.filter(status="SUCCESS")
    total_revenue = sum(payment.amount for payment in revenue)

    return Response(
        {
            "total_users": total_users,
            "total_drivers": total_drivers,
            "total_deliveries": total_deliveries,
            "total_revenue": total_revenue,
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_deliveries(request):
    if request.user.role != "ADMIN":
        return Response({"error": "Unauthorized"}, status=403)

    deliveries = Delivery.objects.all().order_by("-id")
    serializer = DeliverySerializer(deliveries, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_users(request):
    if request.user.role != "ADMIN":
        return Response({"error": "Unauthorized"}, status=403)
    users = User.objects.all().order_by("-id")
    serializer = RegisterSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_payments(request):
    if request.user.role != "ADMIN":
        return Response({"error": "Unauthorized"}, status=403)
    payments = Payment.objects.all().order_by("-id")
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request,user_id):
    if request.user.role!="ADMIN":
        return Response({"error":"Unauthorized"},status=403)
    
    user=get_object_or_404(User,id=user_id)
    user.delete()
    return Response({
        "message":"User deleted"
    })
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_drivers(request):
    if request.user.role!="ADMIN":
        return Response({"error":"Unauthorized"},status=403)
    
    drivers=User.objects.filter(role="DRIVER")
    serializer=RegisterSerializer(drivers,many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def assign_drivers(request,delivery_id):
    if request.user.role!="ADMIN":
        return Response({"error":"Unauthorized"},status=403)
    driver_id=request.data.get("driver_id")
    try:
        delivery=Delivery.objects.get(id=delivery_id)
        driver=User.objects.get(id=driver_id)
    except:
        return Response({
            "error":"Not found"
        })
    delivery.driver=driver
    delivery.save()
    
    return Response({
        "message":"Driver assigned"
    })
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_update_delivery_status(request,delivery_id):
    if request.user.role!="ADMIN":
        return Response(
            {"error":"Unauhorized"},
            status=403
        )
    try:
        delivery=Delivery.objects.get(id=delivery_id)
    except Delivery.DoesNotExist:
        return Response({"error":"Delivery not found"},status=404)
    
    new_status=request.data.get("status")
    allowed_statuses=["PENDING","ACCEPTED","PICKED_UP","DELIVERED","CANCELLED"]
    
    if new_status not in allowed_statuses:
        return Response(
            {"error":"Invalid status"},
            status=400
        )
    delivery.status=new_status
    delivery.save()
    return Response(
        {"message":"status updated successfully",
         "status":delivery.status})