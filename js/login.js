//Para la primera entrega

//Funcion que redirige a la pagina principal del sitio
function irasitio(){
    window.location.href = "home.html";
}

//Funcion para agarrar el boton y ejecutar su validacion para poder acceder al sitio
document.getElementById("Entrada").addEventListener("click", function(validacion){
    let mail = document.getElementById("Correo").value ;
    let password = document.getElementById("Contrasena").value ;

    //Verificamos que los valores no sean vacios, alertamos al usuario en caso de que los hayan.
    if (mail == "" || password ==""){
        alert ("La informacion ingresada no es valida, intentelo de nuevo");
        validacion.preventDefault();
    }else{
        alert ("Acceso permitido, bienvenido al sitio");
        irasitio();
        //para la segunda entrega
        validacion.preventDefault();
        let Usuario = document.getElementById("Correo").value;
        localStorage.setItem("Mail", Usuario); //Seteamos un item "Mail" con el correo en el local storage
        //agregado para la quinta entrega
        localStorage.setItem("idUsuario", 25801);
    }
})