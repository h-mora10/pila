function getAportante() {
    var id = getUrlParameter(id);

    GET('/aportantes/' + id, function (response) {
        $('#nombre').val(response.nombre);
        $('#tipoPagador option:selected').val(response.tipo_pagador_pensiones);
    });
}

function crearAportante() {
    var data = {
        nombre: $('#nombre').val(),
        usuario: $('#usuario').val(),
        password: $('#password').val(),
        tipoPagador: parseInt($('#tipoPagador option:selected').val())
    }
    
    POST('/aportantes/', JSON.stringify(data), function (response) {
        if (response.mensaje){
            $('#message').html(response.mensaje);
        }
        else if (response.length > 0){
            $('#message').html('¡Aportante creado exitosamente!');
        }
    });
}

function actualizarAportante() {
    var id = getUrlParameter(id);
    var data = {
        nombre: $('#nombre').val(),
        usuario: $('#usuario').val(),
        password: $('#password').val(),
        tipoPagador: parseInt($('#tipoPagador option:selected').val())
    }

    PUT('/aportantes/' + id, JSON.stringify(data), function (response) {
        if (response.mensaje){
            $('#message').html(response.mensaje);
        }
        else if (response.length > 0){
            $('#message').html('¡Aportante actualizado exitosamente!');
        }
    });
}

function eliminarAportante(id) {
    DELETE('/aportantes/' + id, function (response) {
        if (response.mensaje){
            $('#message').html(response.mensaje);
        }
        else if (response.length > 0){
            $('#message').html('¡Aportante eliminado exitosamente!');
        }
        location.reload();
    });
}