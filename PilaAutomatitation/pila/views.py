# coding=utf-8
import json
import traceback

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User, Group
from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import OperadorServicio, Aportante


# Create your views here.
@csrf_exempt
def pila_login(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)

            nombre_usuario = data['usuario']
            contrasenia = data['password']

            usuario = authenticate(username=nombre_usuario, password=contrasenia)

            if usuario is not None:
                login(request, usuario)
                print usuario

                return HttpResponse(serializers.serialize("json", [usuario]))
            else:
                return JsonResponse({"mensaje": "Ocurrió un error al intentar hacer login"})
    except:
        traceback.print_exc()
        return JsonResponse({"mensaje": "Ocurrió un error al intentar hacer login"})


@csrf_exempt
def crear_consultar_aportante(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)

            nombre_usuario = data['usuario']
            contrasenia = data['password']
            nombre = data['nombre']
            tipo_pagador_pensiones = data['tipoPagador']

            usuario = User.objects.create_user(username=nombre_usuario, password=contrasenia)
            grupo = Group.objects.get(name__iexact="APORTANTE")
            grupo.user_set.add(usuario)

            operador_servicio = OperadorServicio.objects.get(pk=1)

            aportante = Aportante()
            aportante.usuario_id = usuario
            aportante.nombre = nombre
            aportante.tipo_pagador_pensiones = tipo_pagador_pensiones
            aportante.operador_servicio = operador_servicio
            aportante.save()

            return HttpResponse(serializers.serialize("json", [aportante]))
        elif request.method == 'GET':
            aportantes = Aportante.objects.all().values('pk', 'usuario_id', 'nombre', 'tipo_pagador_pensiones',
                                                        'operador_servicio')

            for aportante in aportantes:
                a = Aportante.objects.get(pk=aportante['pk'])
                aportante['tipo_pagador_pensiones_nombre'] = a.get_tipo_pagador_pensiones_display()

            aportantes = json.loads(json.dumps(list(aportantes)))

            return JsonResponse(aportantes, safe=False)
    except:
        traceback.print_exc()
        return JsonResponse({"mensaje": "Ocurrió un error creando el aportante"})


@csrf_exempt
def actualizar_eliminar_aportante(request, id):
    try:
        if request.method == 'PUT':
            data = json.loads(request.body)

            aportante = Aportante.objects.get(pk=id)
            usuario = User.objects.get(pk=aportante.usuario_id.id)

            if data['password']:
                usuario.set_password(data['password'])
                usuario.save()

            if data['nombre']:
                aportante.nombre = data['nombre']

            if data['tipoPagador']:
                aportante.tipo_pagador_pensiones = data['tipoPagador']

            aportante.save()

            return HttpResponse(serializers.serialize("json", [aportante]))
        elif request.method == 'DELETE':
            aportante = Aportante.objects.get(pk=id)
            usuario = User.objects.get(pk=aportante.usuario_id.id)
            usuario.delete()
            aportante.delete()

            return JsonResponse({"mensaje": "ok"})
        elif request.method == 'GET':
            aportante = Aportante.objects.get(pk=id)
            respuesta = {
                'pk': aportante.pk,
                'usuario_id': aportante.usuario_id.id,
                'usuario': aportante.usuario_id.username,
                'nombre': aportante.nombre,
                'tipo_pagador_pensiones': aportante.tipo_pagador_pensiones,
                'operador_servicio': aportante.operador_servicio.id,
                'tipo_pagador_pensiones_nombre': aportante.get_tipo_pagador_pensiones_display()
            }

            return JsonResponse(respuesta, safe=False)
    except:
        traceback.print_exc()
        return JsonResponse({"mensaje": "Ocurrió un error actualizando/eliminando el aportante " + str(id)})
