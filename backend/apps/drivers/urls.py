from django.urls import path
from .views import(
    create_driver_profile,
    get_driver_profile,
    update_online_status,
    update_location
)
urlpatterns=[
    path('create-profile/',create_driver_profile),
    path('profile/',get_driver_profile),
    path('online-status/',update_online_status),
    path('update-location',update_location)
]