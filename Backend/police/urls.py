from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.do_login, name="login"),
    path("add-compliant/", views.add_compliant, name="add-compliant"),
    path("add-appointment/", views.add_appointment, name="add-appointment"),
    path("add-noc/", views.add_noc, name="add-noc"),
    path("get-status/<str:pk>", views.get_status, name="get-status"),
    path("add-post/", views.add_post, name="add-post"),
    path("get-posts/", views.get_posts, name="get-posts"),
    path("delete-post/", views.delete_post, name="delete-post"),
    path("get-compliants/", views.get_compliants, name="get-compliants"),
    path("compliant/<str:pk>/", views.update_compliant, name="update-compliant"),
    path("add-sos/", views.add_sos, name="add-sos"),
    path("get-sos/", views.get_sos, name="get-sos"),
    path("get-zones/", views.get_zones, name="get-zones"),
    path("get-stats/", views.get_stats, name="get-stats"),
]
