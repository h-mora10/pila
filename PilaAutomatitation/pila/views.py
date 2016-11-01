# coding=utf-8
import json

from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import OperadorServicio, Aportante


# Create your views here.


@csrf_exempt
def crear_aportante(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)

            nombre_usuario = data['usuario']
            contrasenia = data['password']
            nombre = data['nombre']
            tipo_pagador_pensiones = data['tipoPagador']

            usuario = User.objects.create_user(username=nombre_usuario, password=contrasenia)
            operador_servicio = OperadorServicio.objects.get(pk=1)

            aportante = Aportante()
            aportante.usuario_id = usuario
            aportante.nombre = nombre
            aportante.tipo_pagador_pensiones = tipo_pagador_pensiones
            aportante.operador_servicio = operador_servicio
            aportante.save()

            return HttpResponse(serializers.serialize("json", [aportante]))
    except:
        return JsonResponse({"mensaje": "Ocurrió un error creando el aportante"})


@csrf_exempt
def actualizar_eliminar_aportante(request, id):
    try:
        if request.method == 'PUT':
            data = json.loads(request.body)

            aportante = Aportante.objects.get(pk=id)
            usuario = User.objects.get(pk=aportante.usuario_id.id)

            nombre_usuario = data['usuario']
            contrasenia = data['password']
            nombre = data['nombre']
            tipo_pagador_pensiones = data['tipoPagador']

            usuario.password = contrasenia
            usuario.save()

            aportante.nombre = nombre
            aportante.tipo_pagador_pensiones = tipo_pagador_pensiones
            aportante.save()

            return HttpResponse(serializers.serialize("json", [aportante]))
        elif request.method == 'DELETE':
            aportante = Aportante.objects.get(pk=id)
            usuario = User.objects.get(pk=aportante.usuario_id.id)
            usuario.delete()
            aportante.delete()
            return JsonResponse({"mensaje": "ok"})
    except:
        return JsonResponse({"mensaje": "Ocurrió un error actualizando/eliminando el aportante " + str(id)})
