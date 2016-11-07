$(window).load(function () {
    var id = getUrlParameter('id');

    GET('/pensionados/' + id + '/', function (response) {
        $('#nombre').val(response.nombre);
        $('#usuario').val(response.usuario);
        $('#tipoPagador option:selected').val(response.tipo_pagador_pensiones);

        $('#nombre').val(response.nombre),
        $('#edad').val(response.edad),
        $('#salario').val(response.salario),
        $('input:radio[name="esAltoRiesgo"]').filter('[value="' + response.es_alto_riesgo + '"]').attr('checked', true);
        $('input:radio[name="esCongresista"]').filter('[value="' + response.es_congresista + '"]').attr('checked', true);
        $('input:radio[name="esTrabajadorCTI"]').filter('[value="' + response.es_trabajador_CTI + '"]').attr('checked', true);
        $('input:radio[name="esAviador"]').filter('[value="' + response.es_aviador + '"]').attr('checked', true);
        $('#residenciaExterior').val(response.residencia_exterior),
        $('input:radio[name="tieneGrupoFamiliarColombia"]').filter('[value="' + response.tiene_grupo_familiar_colombia + '"]').attr('checked', true);
        $('#codigoCIU').val(response.codigo_CIU),
        $('#tipoPensionado option:selected').val(response.tipo_pensionado)
    });
});
