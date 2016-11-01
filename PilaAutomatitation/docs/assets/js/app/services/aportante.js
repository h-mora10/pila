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
    },
    function (fail) {
        var f = fail;
    });
}
