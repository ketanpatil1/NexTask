from django.urls import path
from .views import home, main

urlpatterns = [
    path("", home, name="main"),
    path("home/", home, name="home"),
    path("main/", main, name="main"),
]
