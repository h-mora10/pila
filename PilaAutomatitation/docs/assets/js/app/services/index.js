var globalParameters = {};


function isServiceOperatorAuthenticated() {
    var user = sessionStorage.getItem('user');
    if (user) {
        USER = JSON.parse(user);
        if (USER.tipo == OPERATOR) {
            $('#labelUsername').html(USER.name + '<small>' + USER.tipo + '</small>');
        }
    }
    else{
        window.location.href = "../../index.html";
    }
}

function isContributorAuthenticated() {
    var user = sessionStorage.getItem('user');
    if (user) {
        USER = JSON.parse(user);
        if (USER.tipo == CONTRIBUTOR) {
            $('#labelUsername').html(USER.name + '<small>' + USER.tipo + '</small>');
        }
    }
    else{
        window.location.href = "../../index.html";
    }
}


