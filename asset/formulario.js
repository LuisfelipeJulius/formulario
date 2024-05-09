 // Evento de envío del formulario
  document.getElementById("miFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe normalmente
    
    // Muestra el modal con el spinner
    var spinnerModal = new bootstrap.Modal(document.getElementById('spinnerModal'), {
      backdrop: 'static',
      keyboard: false
    });
    spinnerModal.show();
    
    // Captura los datos del formulario
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var cc_nit = document.getElementById("cc_nit").value;
    var municipio = document.getElementById("cliente").value;
    var apellido = document.getElementById("apellido").value;
    var celular = document.getElementById("celular").value;
    var departamento = document.getElementById("ciudad").value;
    var aceptacionTerminos = document.getElementById("agreeCheckbox").checked;
    
    // Obtiene la fecha actual
    var fechaRegistro = new Date().toLocaleDateString(); // Obtiene solo la fecha

    // Establecer manualmente el valor de origen como "Finca"
  var origen = "Finca";
    
    // Construye el objeto de datos
    var datos = {
      nombre: nombre,
      correo: correo,
      cc_nit: cc_nit,
      municipio: municipio,
      apellido: apellido,
      celular: celular,
      departamento: departamento,
      aceptacionTerminos: aceptacionTerminos,
      fechaRegistro: fechaRegistro, // Agrega la fecha de registro
      origen: origen // Agrega el origen del formulario
    };
    
    // Envía los datos al webhook
    fetch('https://hook.us1.make.com/xuwt7cdemj1oo3w8vj7irmslasx89hqy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(function() {
      // Oculta el modal
      spinnerModal.hide();
      // Redirige a la siguiente URL después de enviar el formulario con éxito
      window.top.location.href = 'https://www.finca.co/jornada-ganadera-mayo-2024/registro-exitoso';
    })
    .catch(function(error) {
      // Oculta el modal
      spinnerModal.hide();
      // Maneja el error, podrías mostrar un mensaje de error o hacer algo más
      console.error('Hubo un problema con la petición Fetch:', error);
    });
  });

  // Habilitar el botón de enviar cuando se marque el checkbox de aceptación
  document.getElementById("agreeCheckbox").addEventListener("change", function() {
    document.getElementById("enviarBtn").disabled = !this.checked;
  });
  


  // Mostrar el popup cuando se hace clic en el texto de autorización
document.getElementById("popupTrigger").addEventListener("click", function() {
  var popup = document.getElementById("popup");
  popup.style.display = "flex";
  // Asegurar que el popup se abra en toda la pantalla del sitio
  window.parent.postMessage({action: 'showPopup'}, '*');
});

// Cerrar el popup cuando se hace clic en el botón de cerrar
document.getElementById("closePopupButton").addEventListener("click", function() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
});

// Evento de envío del formulario
document.getElementById("miFormulario").addEventListener("submit", function(event) {
  // Resto del código del evento de envío del formulario...
});



 

 