from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login/$', views.pila_login),
    url(r'^aportantes/$', views.crear_consultar_aportante),
    url(r'^aportantes/(?P<id>\d+)', views.actualizar_eliminar_aportante),
    url(r'^pensionados/$', views.crear_consultar_pensionado),
    url(r'^pensionados/(?P<id>\d+)', views.actualizar_eliminar_pensionado)
]
