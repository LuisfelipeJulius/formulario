var $self = this;
var endpointApi;
var moduleId;
var _sf;
var Authorization = "";
const settings = { isAngular: true, requiredMode: 'span' };
function callGet(endpoint, route) {
    var response = {};
    $.ajax({
        url: $self.ServicePath + endpoint + '/' + route,
        method: "GET",
        headers: $self.Headers,
        success: function (data) {
            response = data.Result;
        },
        error: function (error) {
            response = error;
        },
        async: false
    });
    return response;
}
function callPost(endpoint, route, object) {
    var response = {};
    $.ajax({
        url: $self.ServicePath + endpoint + '/' + route,
        method: "POST",
        data: object,
        headers: $self.Headers,
        success: function (data) {
            console.log(data);
            response = data.Result;
        },
        error: function (error) {
            response = error;
        },
        async: false
    });
    return response;
}
function callGetQuery(endpoint, route, value, query) {
    var response = {};
    $.ajax({
        url: $self.ServicePath + endpoint + '/' + route + '?' + query + '=' + value,
        method: "GET",
        headers: $self.Headers,
        success: function (data) {
            response = data.Result;
        },
        error: function (error) {
            response = error;
        },
        async: false
    });
    return response;
}
function inicializeEndpoint(moduleId) {
    //this.endpointApi = endpoint;
    this.moduleId = moduleId;

    if ($.ServicesFramework) {
        _sf = $.ServicesFramework(moduleId);
        $self.ServiceRoot = '/desktopmodules/JuliusProject/api/';//_sf.getServiceRoot('KickStarter');
        $self.ServicePath = $self.ServiceRoot;
        $self.Headers = {
            "ModuleId": moduleId,
            "TabId": _sf.getTabId(),
            "RequestVerificationToken": _sf.getAntiForgeryValue()
        };
    }
}

//Valida el estado de la página, que cumpla con: requeridos, campo email, campo solo número, entre otros.
function pageIsValid() {
    let inputValid = validateInput();
    let selectValid = validateSelect();
    return inputValid && selectValid;
}
//Valida el estado de la página, que cumpla con: requeridos, campo email, campo solo número, entre otros.
function pageIsValidContent(container) {
    let inputValid = validateInput2(container);
    let selectValid = validateSelect();
    return inputValid && selectValid;
}

//Manejador de los campos input
function validateInput() {
    let isValid = true;
    var required = document.querySelectorAll('input[ax-required=true]');
    if (required.length > 0) {
        for (var i = 0; i < required.length; i++) {
            if (required[i].type === "checkbox") {
                if (!required[i].checked) {
                    switch (settings.requiredMode) {
                        case 'span':
                            createRequired(required, i);
                            break;
                        case 'modal':
                            break;
                    }

                    isValid = false;
                }
            }
            else if (required[i].type === "email") {
                var valid = ValidarEmail(required[i].id);
                if (!required[i].value && !valid) {
                    switch (settings.requiredMode) {
                        case 'span':
                            createRequired(required, i);
                            break;
                        case 'modal':
                            break;
                    }

                    isValid = false;
                }
            }
            else {
                if (!required[i].value) {
                    switch (settings.requiredMode) {
                        case 'span':
                            createRequired(required, i);
                            break;
                        case 'modal':
                            break;
                    }

                    isValid = false;
                }
            }
        }
    }
    return isValid;
}
//Manejador de los campos input
function validateInput2(container) {
    let isValid = true;
    var required = container.querySelectorAll('input[ax-required=true]');
    if (required.length > 0) {
        for (var i = 0; i < required.length; i++) {
            if (required[i].type === "checkbox") {
                if (!required[i].checked) {
                    switch (settings.requiredMode) {
                        case 'span':
                            createRequired(required, i);
                            break;
                        case 'modal':
                            break;
                    }

                    isValid = false;
                }
            }
            else if (required[i].type === "email") {
                var valid = ValidarEmail(required[i].id);
                if (!required[i].value && !valid) {
                    switch (settings.requiredMode) {
                        case 'span':
                            createRequired(required, i);
                            break;
                        case 'modal':
                            break;
                    }

                    isValid = false;
                }
            }
            else {
                if (!required[i].value) {
                    switch (settings.requiredMode) {
                        case 'span':
                            createRequired(required, i);
                            break;
                        case 'modal':
                            break;
                    }

                    isValid = false;
                }
            }
        }
    }
    return isValid;
}

//Crea el texto "Campo requerido" en el documento.
function createRequired(required, i) {
    let messageExist = required[i].parentElement.querySelector('.error-required');
    if (!messageExist) {
        let requiredMessage = required[i].getAttribute('ax-required-text');
        let span = document.createElement('span');
        span.innerText = requiredMessage;
        span.setAttribute('class', 'error-required');
        required[i].parentElement.appendChild(span);

        switch (required[i].type) {
            case 'text':
                required[i].addEventListener('keyup', function (e) {
                    if (e.currentTarget.value) {
                        let aux = required[i].parentElement.querySelector('.error-required');
                        if (aux) {
                            aux.parentNode.removeChild(aux);
                        }
                    }
                });
                break;
            case 'select':
                required[i].addEventListener('change', function (e) {
                    if (e.currentTarget.value) {
                        let aux = required[i].parentElement.querySelector('.error-required');
                        if (aux) {
                            aux.parentNode.removeChild(aux);
                        }
                    }
                });
                break;

            case 'checkbox':
                required[i].addEventListener('change', function (e) {
                    if (e.currentTarget.checked) {
                        let aux = required[i].parentElement.querySelector('.error-required');
                        if (aux) {
                            aux.parentNode.removeChild(aux);
                        }
                    }
                });
                break;
            case 'email':
                required[i].addEventListener('keyup', function (e) {
                    var valid = ValidarEmail(required[i].value);
                    if (e.currentTarget.value && valid) {
                        let aux = required[i].parentElement.querySelector('.error-required');
                        if (aux) {
                            aux.parentNode.removeChild(aux);
                        }
                    }
                });
                break;
        }
    }
}
function ValidarEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);   
}
function validateSelect() {
    let isValid = true;
    var required = document.querySelectorAll('select[ax-required=true]');
    if (required.length > 0) {
        for (var i = 0; i < required.length; i++) {
            if (required[i].value === "0") {
                switch (settings.requiredMode) {
                    case 'span':
                        createRequired(required, i);
                        break;
                    case 'modal':
                        break;
                }

                isValid = false;
            }
        }
    }
    return isValid;
}

function showAlert(message, type) {
    let alertExist = document.querySelector('.custom-alert');
    if (alertExist) {
        alertExist.parentNode.removeChild(alertExist);
    }

    let body = document.querySelector('body');
    let html = document.createElement('div');
    html.setAttribute('class', 'custom-alert ' + type);
    html.innerHTML = message;
    body.appendChild(html);

    setTimeout(function () {
        let alertExist = document.querySelector('.custom-alert');
        if (alertExist) {
            alertExist.parentNode.removeChild(alertExist);
        }
    }, 3000);
}
function showLoading() {
    let aux = document.querySelector('#panelCargando');
    if (!aux) {
        let html = document.createElement('div');
        html.id = 'panelCargando';
        let span = document.createElement('span');
        span.innerHTML = 'Cargando...';
        let backgorund = document.createElement('div');
        backgorund.setAttribute('class', 'background');
        html.appendChild(backgorund);
        html.appendChild(span);
        document.querySelector('body').appendChild(html);
    }
}

function hideLoading() {
    let aux = document.querySelector('#panelCargando');
    if (aux) {
        aux.parentNode.removeChild(aux);
    }
}


function sendCampaing(tipo) {
    var campaing = '';  
    //saca los atributos del formulario
    var atributos = {

        email: document.getElementById("Correo").value,
        tipo_documento: document.getElementById("TipoDocumento").value,
        numero_documento: document.getElementById("NroDocumento").value,
        nombre: document.getElementById("Nombres").value,
        apellidos: document.getElementById("Apellidos").value,        
        //campania: "Si",
        //aca van los datos que necesitas. Incluir el mail si es necesario

    };
    switch (tipo) {
        case '1':
            campaing = 'mirringo_ideal';
            atributos.mirringo_ideal = "Si";
            break;
        case '2':
            campaing = 'ringo_ideal';
            atributos.ringo_ideal = "Si";
            break;
        default:
    }
   
    //genera el evento
    console.log(atributos);
    var evento = {
        "eventName": campaing,//aca va el nombre del evento predefinido en emBlue
        "email": document.getElementById("Correo").value,
        "attributes": atributos
    };
	
	var origin = location.origin;
	
	Authorization = (origin.includes(".com.pa")) ? "YmU1YTcxYzE4NDBjNDMzMGJkZWEwMjAwYTY4ODAxNTc=" : "ZjhlOGE0YzRlY2RjNGY5MmFjNDcyNTY0NGFkZGM2MzU=";

    $.ajax({
        url: "https://track.embluemail.com/contacts/event",
        headers: {
            "Authorization": "Basic "+Authorization
        },
        data: JSON.stringify(evento),
        contentType: "application/json",
        dataType: "json",
        type: "POST",

    }).done(function (data) {
        console.log(data);
    }).fail(function (data) {
        console.log(data);
    });



}

function SoloNumeros(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum === 8) || (keynum === 47))
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}


function SoloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false;
    for (var i in especiales) {
        if (key === especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) === -1 && !tecla_especial) {
        return false;
    }
}

function SoloLetrasYNumeros(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla === 8) return true;
    if (tecla === 9) return true;
    if (tecla === 11) return true;
    patron = /[0-9A-Za-zñÑ'áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛÑñäëïöüÄËÏÖÜ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}