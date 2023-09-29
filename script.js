let boton = document.getElementById("buscar");
let input = document.getElementById("buscadorUser");
let contenedor = document.getElementById("resultados");
let usersURL = "https://jsonplaceholder.typicode.com/users";
let user = null; 

boton.addEventListener("click", function(){

    // Llama a la función para comenzar la solicitud
    leerJSON(input.value);

});

  async function leerJSON(id) {
    try {
      // Realizar la solicitud fetch
      const respuesta = await fetch(usersURL); 
  
      // Verificar si la solicitud fue exitosa (código de estado HTTP 200)
      if (!respuesta.ok) {
        throw new Error('No se pudo obtener el JSON');
      }
  
      // Convertir la respuesta a JSON y almacenarla en una variable
      const datosJSON = await respuesta.json();
      let usuarioEncontrado = null;
  
      for (var i = 0; i < datosJSON.length; i++) {
        if (id === String(datosJSON[i].id)) {
            usuarioEncontrado = datosJSON[i];
            break; // Sal del bucle una vez que encuentres al usuario
        }
    }
        
    if (usuarioEncontrado) {
            user = usuarioEncontrado;
            console.log(id);
            contenedor.innerHTML=`
            <p class="text-start"><strong> ID:</strong></p>
            <p class="text-start"> ${user.id}</p>

            <p class="text-start"><strong> Nombre:</strong></p>
            <p class="text-start">${user.name}</p>

            <p class="text-start"><strong> Username:</strong></p>
            <p class="text-start">${user.username}</p>

            <p class="text-start"><strong> Email:</strong></p>
            <p class="text-start">${user.email}</p>
      ` 
    

       // Crear un elemento de botón
       var masInfo = document.createElement("button");

       // Configurar el texto y atributos del botón
       masInfo.innerHTML = "Más información";
       masInfo.setAttribute("class", "btn btn-outline-warning");

       // Agregar un evento al botón (opcional)
       masInfo.addEventListener("click", function() {
        if (user) {
          contenedor.innerHTML=`
            <p class="text-start"><strong> ID:</strong></p>
            <p class="text-start"> ${user.id}</p>
            <p class="text-start"><strong> Nombre:</strong></p>
            <p class="text-start">${user.name}</p>
            <p class="text-start"><strong> Username:</strong></p>
            <p class="text-start">${user.username}</p>
            <p class="text-start"><strong> Email:</strong></p>
            <p class="text-start">${user.email}</p>
            <p class="text-start"><strong> Dirección:</strong></p>
            <p class="text-start">${user.address.street}</p>
            <p class="text-start">${user.address.suite}</p>
            <p class="text-start">${user.address.city}</p>
            <p class="text-start">${user.address.zipcode}</p>
            <p class="text-start"><strong>Geo:</strong></p>
            <p class="text-start">Latitud: ${user.address.geo.lat}</p>
            <p class="text-start">Longitud: ${user.address.geo.lng}</p>
            <p class="text-start"><strong>Teléfono:</strong> ${user.phone}</p>
            <p class="text-start"><strong>Sitio Web:</strong> ${user.website}</p>
            <p class="text-start"><strong>Compañía:</strong></p>
            <p class="text-start">Nombre: ${user.company.name}</p>
            <p class="text-start">Frase: ${user.company.catchPhrase}</p>
            <p class="text-start">Bs: ${user.company.bs}</p>
      ` ;
    }});

       // Agregar el botón al contenedor
       contenedor.appendChild(masInfo);


       
      
        } else{
        // Muestra un mensaje si no se encontraron usuarios
        contenedor.innerHTML = '<p>No se encontraron usuarios que coincidan con la búsqueda.</p>';
        }

      }
      
      catch (error) {
      console.error('Ocurrió un error:', error);
    }
}
  
  
  
  