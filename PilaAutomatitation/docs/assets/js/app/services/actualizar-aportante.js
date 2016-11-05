$(window).load(function () {
    var id = getUrlParameter('id');

    GET('/aportantes/' + id + '/', function (response) {
        $('#nombre').val(response.nombre);
        $('#usuario').val(response.usuario);
        $('#tipoPagador option:selected').val(response.tipo_pagador_pensiones);
    });
});
