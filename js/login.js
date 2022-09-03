function irasitio(){
    window.location.href = "home.html";
}

document.getElementById("Entrada").addEventListener("click", function(validacion){
    let mail = document.getElementById("Correo").value ;
    let password = document.getElementById("Contrasena").value ;
    console.log (mail + " " + password);

    if (mail == "" || password ==""){
        alert ("La informacion ingresada no es valida, intentelo de nuevo");
        validacion.preventDefault();
    }else{
        alert ("Acceso permitido, bienvenido al sitio");
        irasitio();
        validacion.preventDefault();
        let Usuario = document.getElementById("Correo").value;
        localStorage.setItem("Mail", Usuario);
    }
})