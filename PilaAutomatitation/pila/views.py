import json

from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import OperadorServicio, Aportante


# Create your views here.


@csrf_exempt
def crear_aportante(request):
    if request.method == 'POST':
        data = json.load(request.body)

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
