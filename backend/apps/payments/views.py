import razorpay
from django.shortcuts import render
from decouple import config
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Payment
from apps.deliveries.models import Delivery

client = razorpay.Client(
    auth=(config("RAZORPAY_KEY_ID"), config("RAZORPAY_KEY_SECRET"))
)


# create payment order
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_payment(request, delivery_id):
    try:
        delivery = Delivery.objects.get(id=delivery_id)
        print("RAZORPAY_KEY_ID =", config("RAZORPAY_KEY_ID"))
    except Delivery.DoesNotExist:
        return Response(
            {"error": "Delivery not found"}, status=status.HTTP_404_NOT_FOUND
        )

    amount = int(delivery.price * 100)
    try:
        payment_order = client.order.create(
            {"amount": amount, "currency": "INR", "payment_capture": "1"}
        )

        payment = Payment.objects.create(
            customer=request.user,
            delivery=delivery,
            razorpay_order_id=payment_order["id"],
            amount=delivery.price,
        )
        return Response(
            {
                "message": "Payment order created",
                "razorpay_order_id": payment_order["id"],
                "amount": amount,
                "currency": "INR",
                "key": config("RAZORPAY_KEY_ID"),
            }
        )
    except Exception as e:
        print("RAZORPAY ERROR:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# verify payment
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    razorpay_order_id = request.data.get("razorpay_order_id")
    razorpay_payment_id = request.data.get("razorpay_payment_id")
    razorpay_signature = request.data.get("razorpay_signature")
    try:
        payment = Payment.objects.get(razorpay_order_id=razorpay_order_id)
    except Payment.DoesNotExist:
        return Response(
            {"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND
        )
    try:
        client.utility.verify_payment_signature(
            {
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": razorpay_payment_id,
                "razorpay_signature": razorpay_signature,
            }
        )
        payment.razorpay_payment_id = razorpay_payment_id
        payment.razorpay_signature = razorpay_signature
        payment.status = "SUCCESS"
        payment.save()
        return Response({"message": "Payment verified successfully"})

    except:
        payment.status = "FAILED"
        payment.save()
        return Response(
            {"error": "Payment verifivation failed"}, status=status.HTTP_400_BAD_REQUEST
        )
