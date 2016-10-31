function loginPila() {
    var username = $('#username').val();
    var password = $('#password').val();

    if (username == 'admin' && password == 'admin'){
        USER = {name:"admin", username: "admin", token: "123456", tipo: OPERATOR};
        sessionStorage.setItem('user', JSON.stringify(USER));
        window.location.href = "html/operadorServicio/consultar-aportante.html";
    }
    else if (username == 'aportante' && password == 'aportante'){
        USER = {name:"aportante", username: "aportante", token: "123456", tipo: CONTRIBUTOR};
        sessionStorage.setItem('user', JSON.stringify(USER));
        window.location.href = "html/aportante/consultar-pensionado.html";
    }
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
