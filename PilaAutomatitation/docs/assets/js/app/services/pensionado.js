function crearPensionado() {
    var data = {
        aportante: USER.pk,
        nombre: $('#nombre').val(),
        edad: $('#edad').val(),
        salario: $('#salario').val(),
        esAltoRiesgo: $("input[name='esAltoRiesgo']").groupVal(),
        esCongresista: $("input[name='esCongresista']").groupVal(),
        esTrabajadorCTI: $("input[name='esTrabajadorCTI']").groupVal(),
        esAviador: $("input[name='esAviador']").groupVal(),
        residenciaExterior: $('#residenciaExterior').val(),
        tieneGrupoFamiliarColombia: $("input[name='tieneGrupoFamiliarColombia']").groupVal(),
        codigoCIU: $('#codigoCIU').val(),
        tipoPensionado: $('#tipoPensionado option:selected').val()
    };
    
    POST('/pensionados/', JSON.stringify(data), function (response) {
        if (response.mensaje){
            $('#message').html(response.mensaje);
        }
        else if (response.length > 0){
            $('#message').html('¡Pensionado creado exitosamente!');
        }
    });
}

function actualizarPensionado() {
    var id = getUrlParameter('id');
    var data = {
        nombre: $('#nombre').val(),
        edad: $('#edad').val(),
        salario: $('#salario').val(),
        esAltoRiesgo: $("input[name='esAltoRiesgo']").groupVal(),
        esCongresista: $("input[name='esCongresista']").groupVal(),
        esTrabajadorCTI: $("input[name='esTrabajadorCTI']").groupVal(),
        esAviador: $("input[name='esAviador']").groupVal(),
        residenciaExterior: $('#residenciaExterior').val(),
        tieneGrupoFamiliarColombia: $("input[name='tieneGrupoFamiliarColombia']").groupVal(),
        codigoCIU: $('#codigoCIU').val(),
        tipoPensionado: $('#tipoPensionado option:selected').val()
    };

    PUT('/pensionados/' + id, JSON.stringify(data), function (response) {
        if (response.mensaje){
            $('#message').html(response.mensaje);
        }
        else if (response.length > 0){
            $('#message').html('¡Pensionado actualizado exitosamente!');
        }
    });
}

function eliminarPensionado(id) {
    DELETE('/pensionados/' + id, function (response) {
        if (response.mensaje){
            $('#message').html(response.mensaje);
        }
        else if (response.length > 0){
            $('#message').html('¡Pensionado eliminado exitosamente!');
        }
        location.reload();
    });
}

jQuery.fn.extend({
    groupVal: function() {
        return $(this).filter(':checked').val();
    }
});
