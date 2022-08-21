let productsArray = [];

function showproductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail"> </img>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name + " - " + products.currency + " " + products.cost + `</h4> 
                        <p> `+ products.description +`</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend; 
        console.log (htmlContentToAppend);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_URL + 101 + ".json").then(function(resultObj){
        if (resultObj.status == "ok")
        {
            productsArray = resultObj.data;
            showproductsList(productsArray);
            console.log (resultObj.status);
        }
    });
});