//Para la primera entrega

let currentProductsList = [];

function setProductID(id) {
    localStorage.setItem("products", id);
    window.location = "product-info.html"
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsList.products.length; i++){
        let products = currentProductsList.products[i];

        if (((minPrice == undefined) || (minPrice != undefined && products.cost >= minPrice)) &&
        ((maxPrice == undefined) || (maxPrice != undefined && products.cost <= maxPrice))){
            htmlContentToAppend += `
            <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name + " - " + products.currency + products.cost}</h4>
                            <small class="text-muted">${products.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        }
    }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
        console.log(currentProductsList);
    }

document.addEventListener("DOMContentLoaded", function(l){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsList = resultObj.data;
            showProductsList();
        }
    })
    //Agregado para la segunda entrega
    document.getElementById("ordenaAMayor").addEventListener("click", function(){
        ordenayMuestraProducts("ordenaAMayor");
    });

    document.getElementById("ordenaAMenor").addEventListener("click", function(){
        ordenayMuestraProducts("ordenaAMenor");
    });

    document.getElementById("ordenaPorVendidos").addEventListener("click", function(){
        ordenayMuestraProducts("ordenaPorVendidos");
    });

    document.getElementById("limpiarFiltro").addEventListener("click", function(){
        document.getElementById("rangoFiltroMinimo").value = "";
        document.getElementById("rangoFiltroMaximo").value = "";
        minPrice = undefined;
        maxPrice = undefined;
        showProductsList();
    });

    document.getElementById("aplicarFiltro").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por el precio
        //de los productos.
        minPrice = document.getElementById("rangoFiltroMinimo").value;
        maxPrice = document.getElementById("rangoFiltroMaximo").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });
});

//Para la segunda Entrega

let minPrice= undefined;
let maxPrice= undefined;

function ordenayMuestraProducts(condicion){
    if (condicion === "ordenaAMenor")
    {
        currentProductsList.products.sort(function(a, b) {
            if ( a.cost< b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (condicion === "ordenaAMayor"){
        currentProductsList.products.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (condicion === "ordenaPorVendidos"){
        currentProductsList.products.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    showProductsList();
}