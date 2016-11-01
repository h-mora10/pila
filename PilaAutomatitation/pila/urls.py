from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^aportantes/', views.crear_aportante),
]
