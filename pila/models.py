# coding=utf-8
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class OperadorServicio(models.Model):
    usuario_id = models.OneToOneField(User)
    nombre = models.CharField(max_length=250)


class Aportante(models.Model):
    TIPO_PAGADOR_PENSIONES = (
        (1, 'Empleador'),
        (2, 'Administrador de pensiones'),
        (3, 'Pagador de pensiones'),
        (4, 'Pensiones de entidades de los regímenes especiales y de excepción')
    )
    usuario_id = models.OneToOneField(User)
    nombre = models.CharField(max_length=250)
    tipo_pagador_pensiones = models.IntegerField(choices=TIPO_PAGADOR_PENSIONES)
    operador_servicio = models.ForeignKey(OperadorServicio)


class Pensionado(models.Model):
    TIPO_PENSIONADO = (
        (1, 'Pensionado de régimen de prima media. Tope máximo de pensión 25 smlmv'),
        (2, 'Pensionado de régimen de prima media. Sin tope máximo de pensión'),
        (3, 'Pensionado de régimen de ahorro individual. No aplica tope máximo de pensión'),
        (4, 'Pensionado de Riesgos Laborales. Tope máximo de 25 smlmv'),
        (5, 'Pensionado por el empleador, con tope máximo de pensión 25 smlmv'),
        (6, 'Pensionado por el empleador sin tope máximo de pensión'),
        (7, 'Pensionado de entidades de los regímenes especial y de excepción, con tope máximo de pensión 25 smlmv'),
        (8, 'Pensionado de entidades de los regímenes especial y de excepción sin tope máximo de pensión'),
        (9, 'Beneficiario UPC adicional')
    )
    nombre = models.CharField(max_length=250)
    edad = models.IntegerField()
    salario = models.FloatField()
    es_alto_riesgo = models.BooleanField()
    es_congresista = models.BooleanField()
    es_trabajador_CTI = models.BooleanField()
    es_aviador = models.BooleanField()
    residencia_exterior = models.CharField(max_length=250)
    tiene_grupo_familiar_colombia = models.BooleanField()
    codigo_CIU = models.IntegerField()
    tipo_pensionado = models.IntegerField(choices=TIPO_PENSIONADO)
    aportante = models.ForeignKey(Aportante)


class Novedad(models.Model):
    TIPO_NOVEDAD = (
        (1, 'Traslado'),
        (2, 'Variación transitoria de salario'),
        (3, 'Supención temporal'),
        (4, 'Licencia no remunerada'),
        (5, 'Comisión por servicios'),
        (6, 'Incapacidad temporal por enfermedad'),
        (7, 'Licencia maternidad/paternidad'),
        (8, 'Vacaciones'),
        (9, 'Licencia remunerada'),
        (10, 'Aporte volunatario a pensiones')
    )
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    duracion = models.IntegerField()
    tipo_novedad = models.IntegerField(choices=TIPO_NOVEDAD)
    aportante = models.ForeignKey(Aportante)
    pensionado = models.OneToOneField(Pensionado)


class Pago(models.Model):
    valor_salud = models.FloatField()
    valor_pension = models.FloatField()
    valor_riesgos = models.FloatField()
    valor_total = models.FloatField()
    aportante = models.ForeignKey(Aportante)
    beneficiario = models.OneToOneField(Pensionado)
