from django.urls import path
from . import views

urlpatterns = [
    path("",views.get_reply, name="get-reply"),
    path("train/", views.train_model, name="train-model"),
    path("get-stats/", views.get_stats_by_state, name="get-stats"),
]