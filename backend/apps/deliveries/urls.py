from django.urls import path    

from .views import create_delivery,delivery_list,accept_delivery,pending_deliveries,update_delivery_status,customer_deliveries  

urlpatterns = [
    path("create/",create_delivery, name="create-delivery"),
    path("list/", delivery_list, name="delivery-list"),
    path("pending/",pending_deliveries,name="pending-deliveries"),
    path("<int:delivery_id>/accept/",accept_delivery,name="accept-delivery"),
    path("<int:delivery_id>/update/",update_delivery_status,name="update-delivery-status"),
    path("customer_deliveries/", customer_deliveries, name="customer-deliveries"),
]
