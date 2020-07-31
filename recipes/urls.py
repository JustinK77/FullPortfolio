from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views


urlpatterns = [
    path('', views.mainPage, name='mainPage'),
    path('makeSearch/', views.makeSearch)
  
]