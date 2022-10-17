/*Agregado para la quinta entrega*/

let carrito = [];

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CART_INFO_URL).then(function(ObjetoCarrito){
        if (ObjetoCarrito.status === "ok"){
            carrito = ObjetoCarrito.data;
            mostrarListadeCompras();
            configuraciondeEnvio();
            actualizaciondeProducto();
        }
    })
})

function mostrarListadeCompras (){
    let ListatoAppend = ""
    ListatoAppend = `
    <h1 class="text-center p-4">Carrito de Compras</h1>
    <br>
    <h3>Articulos a Comprar</h3>
    <table>
        <thead>
            <tbody>
                <tr>
                    <th> </th>
                    <th> Nombre     </th>
                    <th> Costo      </th>
                    <th> Cantidad   </th>
                    <th> Subtotal   </th>
                </tr>
                <tr>
                    <td> <hr> </td>
                    <td> <hr> </td>
                    <td> <hr> </td>
                    <td> <hr> </td>
                    <td> <hr> </td>
                </tr>
                <tr>
                    <td> <div><img src="${(carrito.articles[0].image)}" class="w-25 h-25"> </div> </td>
                    <td> ${(carrito.articles[0].name)} </td>
                    <td> ${carrito.articles[0].currency+ " " + carrito.articles[0].unitCost} </td>
                    <td>
                        <label for="Contador"></label>
                        <input type ="number" value="${(carrito.articles[0].count)}" min="0" id="Contador"  onkeyup="actualizaciondeProducto()" onclick="actualizaciondeProducto()">
                    </td>
                    <td id="Subtotal"> </td>
                </tr>
            </tbody>
        </thead>
    <table>
    <hr>
    `
    document.getElementById("Carrito").innerHTML+=ListatoAppend;
}

function configuraciondeEnvio (){
    let enviotoAppend = ""
    enviotoAppend = `
    <h3> Tipo de Envio </h3>
    <div class="d-block my-3">
    <div class="custom-control custom-radio">
      <input id="Premium" name="tipoEnvio" type="radio" class="custom-control-input" checked="">
      <label class="custom-control-label" for="Premiun">Premium: De 2 a 5 dias (15%)</label>
    </div>
    <div class="custom-control custom-radio">
      <input id="Express" name="tipoEnvio" type="radio" class="custom-control-input">
      <label class="custom-control-label" for="Express">Express: De 5 a 8 dias (7%)</label>
    </div>
    <div class="custom-control custom-radio">
      <input id="Standar" name="tipoEnvio" type="radio" class="custom-control-input">
      <label class="custom-control-label" for="Standar">Standar: De 12 a 15 dias (5%)</label>
    </div>
    <br>
    <h3> Direccion de Envio </h3>
    <div>
    <label for="Calle"> Calle: </label>
    <input type="text" id="Calle">
    <label for="NumeroCalle"> Numero: </label>
    <input type="number" id="NumeroCalle">
    </div>
    <br>
    <label for="Esquina"> Esquina: </label>
    <input type="text" id="Esquina">
    <br>
    <hr>

    `
    document.getElementById("Envio").innerHTML+=enviotoAppend;
}

function actualizaciondeProducto (){
    let cantidad = document.getElementById("Contador").value;
    let resultado = cantidad * carrito.articles[0].unitCost;
    if (resultado != 0){
        document.getElementById("Subtotal").innerHTML=`<b>${carrito.articles[0].currency+ " " + resultado}</b>`;
    }else{
        document.getElementById("Subtotal").innerHTML=`<b>${carrito.articles[0].currency+ " " + 0}`;
    }
}