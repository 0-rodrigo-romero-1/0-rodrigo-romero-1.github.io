const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
/*Modificado para la segunda entrega*/const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
/*Modificado para la tercera entrega*/const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("products")}.json`;
/*Modificado para la tercera entrega*/const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("products")}.json`;
/*Modificado para la quinta entrega*/const CART_INFO_URL = `https://japceibal.github.io/emercado-api/user_cart/${localStorage.getItem("idUsuario")}.json`;
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Agregado para la segunda entrega (Obsoleto, ya que la cuarta entrega pide agregar funcionalidad a esto)
/* document.addEventListener("DOMContentLoaded", function(){
  let user = localStorage.getItem("Mail");
  let htmlContentToAppend = "";
  htmlContentToAppend += `
  <div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav w-100 justify-content-between">
    <li class="nav-item">
      <a class="nav-link active">${user}</a>
    </li>`
  document.getElementById("Navegador").innerHTML += htmlContentToAppend;
})
*/

//Cuarta Entrega

//Funcion para Remover el correo del local storage y vaciar la variable "user"
function cerrarUsuario(){
  user = localStorage.removeItem("Mail");
  user = "";
}


//Una vez cargado el DOM, se crea un boton estilo dropdown con la variable "user"
//El boton aparece oculto por defecto.
document.addEventListener("DOMContentLoaded", function(){
  let user = localStorage.getItem("Mail");
  let htmlContentToAppend = "";
  htmlContentToAppend += `
  <div class="dropdown d-none" id="BotondeUsuario">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    ${user}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
    <li><a class="dropdown-item" href="index.html" onclick="cerrarUsuario()">Cerrar Sesion</a></li>
  </ul>
  </div>  
  `
  document.getElementById("Navegador").innerHTML += htmlContentToAppend;
  
  //En caso de que se entrase por el apartado de login
  //Se ejecuta una funcion para remover la clase que oculta el boton, haciendo que quede visible y dipsponible para el navegante
  if(user!=null){
  document.getElementById("BotondeUsuario").classList.remove("d-none");
  }
})