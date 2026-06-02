from django.urls import path
from .views import register_user,login_user
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .admin_views import admin_stats,admin_deliveries
from .admin_views import admin_users
from .admin_views import admin_payments
from .admin_views import delete_user,admin_drivers,assign_drivers,admin_update_delivery_status
urlpatterns = [
    path('register/', register_user),
    path('login/', login_user),
    path('token/refresh/', TokenRefreshView.as_view()),
    path("admin/stats/",admin_stats),
    path("admin/deliveries/",admin_deliveries),
    path("admin/users/",admin_users),
    path("admin/payments/",admin_payments),
    path("admin/users/<int:user_id>/delete/",delete_user),
    path("admin/drivers/",admin_drivers),
    path("admin/deliveries/<int:delivery_id>/assign-driver",assign_drivers),
    path("admin/deliveries/<int:delivery_id>/status",admin_update_delivery_status)
]