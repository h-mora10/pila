function loginPila() {
    var data = {
        usuario : $('#username').val(),
        password : $('#password').val()
    };

    POST('/login/', JSON.stringify(data), function (response) {
        if (response && response.mensaje){
            $('#errorMessage').html(response.mensaje);
        }
        else{
            $('#errorMessage').html('');

            USER = response[0];
            sessionStorage.setItem('user', JSON.stringify(USER));

            if ($.inArray(1, USER.fields.groups) == 0){
                window.location.href = "html/aportante/consultar-pensionado.html";
            }
            else if ($.inArray(2, USER.fields.groups) == 0){
                window.location.href = "html/operadorServicio/consultar-aportante.html";
            }
            else if ($.inArray(3, USER.fields.groups) == 0){
                window.location.href = "html/operadorServicio/consultar-aportante.html";
            }
            else{
                window.location.href = "html/aportante/consultar-pensionado.html";
            }
        }
    });
}

function logoutPila() {
    sessionStorage.clear();
    USER = undefined;
    window.location.href = "../../index.html";
}

function verifyUserInIndex(){
    var user = sessionStorage.getItem('user');
    if (user){
        USER = JSON.parse(user);
        if (USER.tipo == OPERATOR){
            window.location.href = "html/operadorServicio/consultar-aportante.html";
        }
        else if (USER.tipo == CONTRIBUTOR){
            window.location.href = "html/aportante/consultar-pensionado.html";
        }
    }
}
