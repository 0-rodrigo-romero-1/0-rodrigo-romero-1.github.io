//Penultima entrega... let's GO!

//Una vez cargado el DOM, invocamos la funcion para mostrar un formulario que permite modificar el perfil del usuario
document.addEventListener("DOMContentLoaded",function(){
    modificarPerfildeUsuario();
})

//funcion para crear un formulario que permite modificar el perfil del usuario.
function modificarPerfildeUsuario(){
    let formulariodePerfiltoAppend = "";
    //Condicion para verificar si el usuario entro al sitio mediante el login.html, ya que usaremos el local storage creado ahi
    if(localStorage.getItem("Mail")===null){
        //En caso de que no lo haya hecho, removemos una clase que oculta una pantalla de error y la hacemos visible
        document.getElementById("Error").classList.remove("d-none");
    }else{
    //En caso de que lo haya hecho, crearemos y mostraremos el formulario correspondiente
    formulariodePerfiltoAppend = `
    <h1 class="mt-4 mb-5"> Perfil </h1>
    <hr class="mt-5">
    <form class="needs-validation" action="home.html" novalidate>
        <div class="row mb-3"> 
            <div class="col"> 
                <label for="1erNombre" class="form-label">Primer Nombre*</label>
                <input type="text" id="1erNombre" class="form-control" required value=${insertarNombre()}> </input>
                    <div class="invalid-feedback">
                        Campo Obligatorio. Ingrese un Nombre
                    </div>
            </div>
            <div class="col"> 
                <label for="2doNombre" class="form-label">Segundo Nombre</label>
                <input type="text" id="2doNombre" class="form-control" value=${insertar2doNombre()}> </input>
            </div>    
        </div>
        <div class="row mb-3"> 
            <div class="col"> 
                <label for="1erApellido" class="form-label">Primer Apellido*</label>
                <input type="text" id="1erApellido" class="form-control" required value=${insertarApellido()}> </input>
                    <div class="invalid-feedback">
                        Campo Obilgatorio. Ingrese un Apellido.
                    </div>
            </div>
            <div class="col"> 
                <label for="2doApellido" class="form-label">Segundo Apellido</label>
                <input type="text" id="2doApellido" class="form-control" value=${insertar2doApellido()}> </input>
            </div>
        <div class="row mt-3"> 
                <div class="col"> 
                    <label for="eMail" class="form-label">E-Mail*</label>
                    <input type="email" id="eMail" class="form-control" value=${insertarCorreo()} required> </input>
                        <div class="invalid-feedback">
                            Campo Obligatorio. Ingrese un E-mail
                        </div>
                </div>
                <div class="col"> 
                    <label for="Contacto" class="form-label">Numero de Contacto</label>
                    <input type="tel" id="Contacto" class="form-control" value=${insertarContacto()}> </input>
                </div>
        </div>
    </div>
    <button class="btn btn-primary" onclick="validacion()">Guardar Cambios</button>    
    </form>
    `
    document.getElementById("perfil").innerHTML += formulariodePerfiltoAppend;
    }
}

// Funcion para validar formularios en donde aplicamos las clases de bootstrap correspondientes
function validacion () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (forms) {
        forms.addEventListener('submit', function (event) {
          if (!forms.checkValidity()) /*En caso de que la validacion falle*/  {
            event.preventDefault()
            event.stopPropagation()
          } else{ /*Si la validacion fue exitosa, creamos objetos en el local storage con la informacion introducida por el usuario*/
            let Nombre = document.getElementById("1erNombre").value
            localStorage.setItem("Name",Nombre);
            let SegundoNombre = document.getElementById("2doNombre").value
            localStorage.setItem("Name2",SegundoNombre);
            let Apellido = document.getElementById("1erApellido").value
            localStorage.setItem("SurName",Apellido);
            let SegundoApellido = document.getElementById("2doApellido").value
            localStorage.setItem("SurName2",SegundoApellido);
            let NuevoCorreo = document.getElementById("eMail").value
            localStorage.setItem("Mail",NuevoCorreo);
            let NumerodeContacto = document.getElementById("Contacto").value
            localStorage.setItem("NContacto",NumerodeContacto);
          }
  
          forms.classList.add('was-validated')
        }, false)
      })
  }

  //Funciones que permiten dejar en el HTML, los valores que son requeridos precargados, en caso de que estos esten disponibles
  //De lo contrario, los inputs requeridos apareceran vacios
  function insertarNombre(){
    if (localStorage.getItem("Name")!=null){
        return localStorage.getItem("Name");
    }else{
        return "";
    }
}

function insertar2doNombre(){
    if (localStorage.getItem("Name2")!=null){
        return localStorage.getItem("Name2");
    }else{
        return "";
    }
}

  function insertarApellido(){
    if (localStorage.getItem("SurName")!=null){
        return localStorage.getItem("SurName");
    }else{
        return "";
    }
}

function insertar2doApellido(){
    if (localStorage.getItem("SurName2")!=null){
        return localStorage.getItem("SurName2");
    }else{
        return "";
    }
}

  function insertarCorreo(){
    if (localStorage.getItem("Mail")!=null){
        return localStorage.getItem("Mail");
    }else{
        return "";
    }
}

function insertarContacto(){
    if (localStorage.getItem("NContacto")!=null){
        return localStorage.getItem("NContacto");
    }else{
        return "";
    }
}