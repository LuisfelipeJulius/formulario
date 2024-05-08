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
    var municipio = document.getElementById("municipio").value;
    var apellido = document.getElementById("apellido").value;
    var celular = document.getElementById("celular").value;
    var departamento = document.getElementById("departamento").value;
    
    // Construye el objeto de datos
    var datos = {
      nombre: nombre,
      correo: correo,
      cc_nit: cc_nit,
      municipio: municipio,
      apellido: apellido,
      celular: celular,
      departamento: departamento
    };
    
    // Envía los datos al webhook
    fetch('https://hook.us1.make.com/xuwt7cdemj1oo3w8vj7irmslasx89hqy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Oculta el modal
      spinnerModal.hide();
      // Redirige a la siguiente URL
      window.location.href = 'https://www.finca.co/';
    })
    .catch(function(error) {
      // Oculta el modal
      spinnerModal.hide();
      // Maneja el error, podrías mostrar un mensaje de error o hacer algo más
      console.error('Hubo un problema con la petición Fetch:', error);
    });
  });


 

  // funcion departamento ciudad

  document.addEventListener("DOMContentLoaded", function () {
    var departamentoSelect = document.getElementById("departamento");
    departamentoSelect.addEventListener("change", cargarCiudades);

    function cargarCiudades() {
        var ciudadesSelect = document.getElementById("municipio");
        var departamento = departamentoSelect.value;

        // Limpiar opciones anteriores
        ciudadesSelect.innerHTML = '<option value="">Selecciona tu ciudad</option>';

        // Obtener el JSON de manera asíncrona
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/asset/colombia.json", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var json = JSON.parse(xhr.responseText);

                // Encontrar el departamento en el JSON
                var deptoEncontrado = json.find(function (item) {
                    return item.departamento === departamento;
                });

                if (deptoEncontrado) {
                    // Agregar las ciudades correspondientes al departamento seleccionado
                    deptoEncontrado.ciudades.forEach(function (ciudad) {
                        var option = document.createElement("option");
                        option.value = ciudad;
                        option.text = ciudad;
                        ciudadesSelect.appendChild(option);
                    });
                }
            }
        };
        xhr.send();
    }
});

