from django.contrib import admin

from .models import OperadorServicio, Aportante, Pensionado, Novedad, Pago

# Register your models here.

admin.site.register(OperadorServicio)
admin.site.register(Aportante)
admin.site.register(Pensionado)
admin.site.register(Novedad)
admin.site.register(Pago)
