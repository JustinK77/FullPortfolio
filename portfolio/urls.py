from django.urls import path, include

from . import views


app_name = "portfolio"
urlpatterns = [
    path('', views.portHome, name='index'),
    path('books/', views.bookList, name='books'),
    path('recipes/', include('recipes.urls'))
]