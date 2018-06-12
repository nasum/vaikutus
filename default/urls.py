from django.urls import path

from . import views as default_views

app_name = 'default'
urlpatterns = [
    path('', default_views.index, name='index'),
]