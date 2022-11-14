//Agregado para la tercer entrega

// Variable que son array vacios, para poder trabajar con ellos en las siguientes funciones
let infodelProducto = [];
let comentariosdelProducto = [];

//Hacemos un DOBLE fetch de estilo getJSONData para poder mostar la informacion del producto, sus relacionados, comentarios y poruqe no, una caja de comentarios para que el usuario pueda dejar uno (Sin funcionalidad xD)
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCT_INFO_URL).then(function(ObjetoInfo){
        if (ObjetoInfo.status === "ok"){
            infodelProducto = ObjetoInfo.data
            mostrarProducto();
            mostrarProdRelacionados(infodelProducto.relatedProducts);
        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(ObjetoComentarios){
        if (ObjetoComentarios.status === "ok"){
            comentariosdelProducto = ObjetoComentarios.data
            mostrarComentariosdelProducto();
            cajadeComentarios();
        }
    })
})

//Funcion para mostrar la informacion del producto, que es appendeado a un div de clase container (que se encuentra en el HTML del mismo nombre)
function mostrarProducto(){
    let productotoAppend = "";
    productotoAppend = `
    <h1>${infodelProducto.name}</h1>
    <hr>
    <br>
    <h3>Precio</h3>
    <p>${infodelProducto.currency+ " " + infodelProducto.cost}</p>
    <h3>Descripcion</h3>
    <p>${infodelProducto.description}</p>
    <h3>Categoria</h3>
    <p>${infodelProducto.category}</p>
    <h3>Se han vendido:</h3>
    <p>${infodelProducto.soldCount + " " + "articulos de este producto"}
    <h3>Imagenes del Producto</h3>
    `
    for(let i=0; i<infodelProducto.images.length; i++){
        productotoAppend +=`
        <div class="row">
        <div class="col-3">
        <img src="${(infodelProducto.images[i])}" class="img-thumbnail">
        </div>
        </div>
        `
    }
    
    document.getElementById("producto").innerHTML += productotoAppend;
}

//Funcion para mostrar los comentarios del producto y su puntuacion, que es appendeado a un div de clase container (que se encuentra en el HTML del mismo nombre)
function mostrarComentariosdelProducto(){
    let comentariostoAppend="";
    comentariostoAppend = `
    <h2> Comentarios sobre el producto </h2>
    `
    for(let i = 0; i < comentariosdelProducto.length; i++){
        comentariostoAppend +=`
        <div class="list-group-item">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${(comentariosdelProducto[i].user + " - " + comentariosdelProducto[i].dateTime + " - " + de1a5estrellas(comentariosdelProducto[i].score))}</h4>
                </div>
                <p class="mb-1">${(comentariosdelProducto[i].description)}</p>
            </div>
        </div>
    </div>
        `
    }
    document.getElementById("comentarios").innerHTML += comentariostoAppend;
}

//Funcion que se invoca en la funcion mostrarComentariosdelProducto() para desplegar la puntuacion en forma de estrellas
function de1a5estrellas(valor){
    let estrellas =[];
    for(let i=0; i<=4; i++){
        if(i<valor){
            let marca=`<span class="fa fa-star checked"></span>`
            estrellas.push(marca);
        }else{
            let nomarca=`<span class="fa fa-star"></span>`
            estrellas.push(nomarca);
        }
    }
    return estrellas;
}

//Agregado para la cuarta entrega

//Funcion para mostrar los productos relacionados del mismo, que es appendeado a un div de clase container (que se encuentra en el HTML del mismo nombre)
function mostrarProdRelacionados(relacionados){
    let relatedtoAppend="";
    relatedtoAppend=`
    <hr>
    <h2> Productos similares a este de la misma categoria <h2>
    `
    for(let element of relacionados){
        relatedtoAppend +=`
        <div onclick="nuevoProducto(${element.id})" class="row" >
        <div class="col-3">
        <img src="${(element.image)}" class="img-thumbnail">
        <p>"${(element.name)}"</p>
        </div>
        </div>
        `
    }
    relatedtoAppend +=`
    <br>
    <hr>
    `
    document.getElementById("relacionados").innerHTML += relatedtoAppend;
}

//Funcion que se invoca en mostrarProdRelacionados(), que permite dirigir al usuario al nuevo producto
function nuevoProducto(id){
    localStorage.setItem("products", id);
    window.location = "product-info.html"
}

//Funcion para mostrar un "formulario" que permite al usuario dejar un comentario sobre el producto, que es appendeado a un div de clase container (que se encuentra en el HTML del mismo nombre. De vuelta, no tiene funcionalidad)
function cajadeComentarios(){
    let cajatoAppend = "";
    cajatoAppend = `
    <h1>Dejanos un comentario con respecto al producto</h1>
    <label for="opinion"> Tu opinion:</label>
    <br>
    <textarea id="opinion" name="comment" class="d-flex w-50 justify-content-between"></textarea>
    <br>
      <label for="puntaje"> Tu puntuacion:</label>
      <br>
      <select name="score" id="puntaje">
          <option value="Default">1</option>
          <option value="malo">2</option>
          <option value="decente">3</option>
          <option value="bueno">4</option>
          <option value="perfecto">5</option>
      </select>
    <br>
   <label for="comentar"></label>    
   <input type="submit" class="button" value="Publicar Comentario">
    `
    document.getElementById("formulario").innerHTML += cajatoAppend;
}