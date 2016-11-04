from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login/$', views.pila_login),
    url(r'^aportantes/$', views.crear_consultar_aportante),
    url(r'^aportantes/(?P<id>\d+)/$', views.actualizar_eliminar_aportante),
    url(r'^pensionados/$', views.crear_consultar_pensionado),
    url(r'^pensionados/(?P<id>\d+)/$', views.actualizar_eliminar_pensionado),
    url(r'^aportantes/(?P<id_aportante>\d+)/pensionados/(?P<id_pensionado>\d+)/novedades/$', views.crear_novedad),
    url(r'^aportantes/(?P<id_aportante>\d+)/pensionados/(?P<id_pensionado>\d+)/novedades/(?P<id>\d+)/$',
        views.actualizar_eliminar_novedad),
    url(r'^usuarios/(?P<id>\d+)/$', views.consultar_tipo_usuario),
]
