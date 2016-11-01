from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login/$', views.pila_login),
    url(r'^aportantes/$', views.crear_consultar_aportante),
    url(r'^aportantes/(?P<id>\d+)', views.actualizar_eliminar_aportante)
]
