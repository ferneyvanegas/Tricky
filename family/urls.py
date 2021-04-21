from . import views
from django.conf.urls import url

from django.urls import path
from family.views import cargarFamily, cargarRuleta, cargarTriky

urlpatterns = [
    path('', cargarFamily),
    path('triky/', cargarTriky, name='triky'),
    path('ruleta/', cargarRuleta, name='ruleta')
]
