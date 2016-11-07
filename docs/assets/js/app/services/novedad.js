function crearNovedad() {
    var idPensionado = getUrlParameter('id');
    var data = {
        fechaInicio: $('#fechaInicio').val(),
        fechaFin: $('#fechaFin').val(),
        duracion: parseInt($('#duracion').val()),
        tipo: parseInt($('#tipo option:selected').val())
    };
    
    POST('/aportantes/' + USER.idAportante + '/pensionados/' + idPensionado + '/novedades/', JSON.stringify(data), function (response) {
        if (response.mensaje){
            $('#message').html(response.mensaje);
        }
        else if (response.length > 0){
            $('#message').html('¡Novedad creada exitosamente!');
        }
    });
}

function actualizarNovedad() {
    var id = getUrlParameter('id');
    var data = {
        fechaInicio: $('#fechaInicio').val(),
        fechaFin: $('#fechaFin').val(),
        duracion: parseInt($('#duracion').val()),
        tipo: parseInt($('#tipo option:selected').val())
    };

    PUT('/aportantes/' + USER.idAportante + '/pensionados/' + idPensionado + '/novedades/' + id + '/', JSON.stringify(data), function (response) {
        if (response.mensaje){
            $('#message').html(response.mensaje);
        }
        else if (response.length > 0){
            $('#message').html('¡Novedad actualizada exitosamente!');
        }
    });
}

function eliminarNovedad(id) {
    DELETE('/aportantes/' + USER.idAportante + '/pensionados/' + idPensionado + '/novedades/' + id + '/', function (response) {
        if (response.mensaje){
            $('#message').html(response.mensaje);
        }
        else if (response.length > 0){
            $('#message').html('¡Novedad eliminada exitosamente!');
        }
        location.reload();
    });
}