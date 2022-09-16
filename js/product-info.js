let infodelProducto = [];
let comentariosdelProducto = [];

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCT_INFO_URL).then(function(ObjetoInfo){
        if (ObjetoInfo.status === "ok"){
            infodelProducto = ObjetoInfo.data
            console.log(infodelProducto);
            mostrarProducto();
        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(ObjetoComentarios){
        if (ObjetoComentarios.status === "ok"){
            comentariosdelProducto = ObjetoComentarios.data
            console.log(comentariosdelProducto);
            mostrarComentariosdelProducto();
        }
    })
})

function mostrarProducto(){
    let productotoAppend = "";
    productotoAppend = `
    <h1>${infodelProducto.name}</h1>
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
    console.log(estrellas);
    return estrellas;
}