/*Agregado para la quinta entrega*/

let carrito = [];

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(CART_INFO_URL).then(function (ObjetoCarrito) {
    if (ObjetoCarrito.status === "ok") {
      carrito = ObjetoCarrito.data;
      mostrarListadeCompras();
      configuraciondeEnvio();
      costosdeCompra();
      metodoModaldePago();
      botondeCompra();
      actualizaciondeProducto();
      envioStandard();
      totaldelacompraStandard();
    }
  })
})

//Añade la tabla con los items al HTML
function mostrarListadeCompras() {
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
                    <td> ${carrito.articles[0].currency + " " + carrito.articles[0].unitCost} </td>
                    <td>
                        <label for="Contador"></label>
                        <input type ="number" value="${(carrito.articles[0].count)}" min="1" id="Contador"  onkeyup="actualizaciondeProducto()" onclick="actualizaciondeProducto()">
                    </td>
                    <td id="Subtotal"> </td>
                </tr>
            </tbody>
        </thead>
    <table>
    <hr>
    `
  document.getElementById("Carrito").innerHTML += ListatoAppend;
}

//Añade Inputs al HTML para poner el tipo de Envio y Direccion (Calle, numero de calle, y esquina)
function configuraciondeEnvio() {
  //Apartado Envio
  let enviotoAppend = ""
  enviotoAppend = `
    <h3> Tipo de Envio </h3>
    <div class="d-block my-3">
    <div class="custom-control custom-radio">
      <input id="Premium" name="tipoEnvio" type="radio" class="custom-control-input" onclick="envioPremium(),totaldelacompraPremium()">
      <label class="custom-form-label" for="Premium">Premium: De 2 a 5 dias (15%)</label>
    </div>
    <div class="custom-control custom-radio">
      <input id="Express" name="tipoEnvio" type="radio" class="custom-control-input" onclick="envioExpress(),totaldelacompraExpress()">
      <label class="custom-form-label" for="Express">Express: De 5 a 8 dias (7%)</label>
    </div>
    <div class="custom-control custom-radio">
      <input id="Standar" name="tipoEnvio" type="radio" class="custom-control-input" onclick="envioStandard(),totaldelacompraStandard()" checked>
      <label class="custom-form-label" for="Standar">Standar: De 12 a 15 dias (5%)</label>
    </div>
    <br>
<!--Apartado Direccion-->
    <h3> Direccion de Envio </h3>
    <div class="row g-3">
      <div class="col-sm-6">
        <label for="Calle"> Calle: </label>
        <input type="text" class="form-control" id="Calle" required>
        <div id="calleValida" class="d-none correcto"> <i class="fa fa-check"> </i> </div> <div id="calleInvalida" class="d-none incorrecto"> Debe ingresar una calle. </div>
      </div>
      <div class="col-sm-6">
        <label for="NumeroCalle"> Numero: </label>
        <input type="number" class="form-control" id="NumeroCalle" min=0 required>
        <div id="numeroValido" class="d-none correcto"> <i class="fa fa-check"> </i> </div> <div id="numeroInvalido" class="d-none incorrecto"> Debe ingresar un número de calle. </div>
      </div>
    </div>
    <div class="row g-3 mt-1 mb-2">
      <div class="col-sm-6">
        <label for="Esquina"> Esquina: </label>
        <input type="text" id="Esquina" class="form-control" required>
        <div id="esquinaValida" class="d-none correcto"> <i class="fa fa-check"> </i> </div> <div id="esquinaInvalida" class="d-none incorrecto"> Debe ingresar una esquina. </div>
      </div>
    </div>

    `
  document.getElementById("Envio").innerHTML += enviotoAppend;
}

/*Agregado para la sexta entrega*/

//Añade la info de costos al HTML
function costosdeCompra() {
  let compraHtmltoAppend = ""
  compraHtmltoAppend = `
    <h4 class="mb-3">Costos</h4>
    <ul class="list-group mb-3">
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Subtotal</h6>
          <small class="text-muted">Precio unitario del producto por cantidad</small>
        </div>
        <div class="text-muted" id="subtotalProducto"></div>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Costo de envio</h6>
          <small class="text-muted">Según el tipo de envio</small>
        </div>
        <span class="text-muted" id="valordeEnvio"></span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>Total ($)</span>
        <strong id="valorTotal"></strong>
      </li>
    </ul>
    <hr class="mb-4">
    `
  document.getElementById("Costos").innerHTML += compraHtmltoAppend;
}

//Añade el Modal al HTML
function metodoModaldePago() {
  let modaltoAppend = "";
  modaltoAppend = `
    <h4 class="mb-3">Metodo de Pago</h4>
    <div id="Estado"><p>No se ha seleccionado modo de pago.</p></div>
    <div id="validacionPago"> </div>
    </span> <span id="Modal"><button type="button" class="m-1 btn btn-link" data-bs-toggle="modal"
    data-bs-target="#pagosModal"> Seleccionar modo de pago </button></span>
    `
  modaltoAppend += `
    <div class="modal fade" tabindex="-1" id="pagosModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><b>Forma de Pago</b></h5>
        </div>
        <div class="modal-body">
          <form id="formadePago" method="post" onSubmit=""  class="needs-validation" nonvalidate>
            <div>
                <input id="Credito" name="tipoPago" type="radio" class="custom-control-input" onclick="eleccionCredito()">
                <label class="custom-form-label" for="Credito">Tarjeta de Credito</label>
                <hr>
            </div>
            <div class="row g-3">
              <div class="col-sm-6" id="TarjetadeCredito">
                <label class="form-label" for="NumeroCredito"> Numero de Tarjeta </label>
                <input class="form-control" type="text" id="numeroCredito" required>
                <div id="divValido0" class="d-none correcto"> <i class="fa fa-check"> </i> </div>
                <div id="divInvalido0" class="d-none incorrecto"> Debe completar este campo. </div>
              </div>
              <div class="col-sm-4" id="CodigodeSeg">
                <label class="form-label for="NumeroCodigo"> Codigo de Seg</label>
                <input class="form-control" type="number" min="100" max="999" id="numeroCodigo" required>
                <div id="divValido1" class="d-none correcto"> <i class="fa fa-check"> </i> </div>
                <div id="divInvalido1" class="d-none incorrecto"> Debe completar este campo. </div>
              </div>
            </div>
            <br>
            <div class="col-sm-6" id="Vencimiento">
              <label class="form-label" for="vigenciaCredito"> Vencimiento (DD/MM/AAAA) </label>
              <input class="form-control" type="date" id="vigenciaCredito" required>
              <div id="divValido2" class="d-none correcto"> <i class="fa fa-check"> </i> </div>
              <div id="divInvalido2" class="d-none incorrecto"> Debe completar este campo. </div>
            </div>
            <hr>
            <div>
                <input id="Banco" name="tipoPago" type="radio" class="custom-control-input" onclick="eleccionBanco()">
                <label class="custom-form-label" for="Banco">Transferencia Bancaria</label>
                <hr>
            </div>
            <div class="form-group">
                <label class="form-label" for="nCuentaBanco"> Numero de Cuenta </label>
                <input class="form-control" type="number" id="nCuentaBanco" required>
                <div id="divValido3" class="d-none correcto"> <i class="fa fa-check"> </i> </div>
                <div id="divInvalido3" class="d-none incorrecto"> Debe completar este campo. </div>
            </div>
            <p class='d-none incorrecto' id="ErrorModal1">Debe seleccionar un metodo de pago</p>
            <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="BotonModal" onclick="validacionMetododePago()">Actualizar</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    `
  document.getElementById("Pagos").innerHTML += modaltoAppend;
}

//Añade el boton al HTML
function botondeCompra() {
  let botontoAppend = ""
  botontoAppend = `
    <label for="Comprar"></label>
    <button class="w-100 btn btn-lg btn-primary" id="Comprar" onclick="validarCompra()">Finalizar Compra</button>   
    `
  document.getElementById("BotondeCompra").innerHTML += botontoAppend;
}

//Actualiza el precio subtotal del producto en la info de Costos
function actualizaciondeProducto() {
  let cantidad = document.getElementById("Contador").value;
  let resultado = cantidad * carrito.articles[0].unitCost;
  if (resultado != 0) {
    document.getElementById("Subtotal").innerHTML = `<b>${carrito.articles[0].currency + " " + resultado}</b>`;
    document.getElementById("subtotalProducto").innerHTML = `${carrito.articles[0].currency + " " + resultado}`;
  } else {
    document.getElementById("Subtotal").innerHTML = `<b>${carrito.articles[0].currency + " " + 0}`;
    document.getElementById("subtotalProducto").innerHTML = `${carrito.articles[0].currency + " " + 0}`;
  }
  return resultado;
}

//Actualiza el subtotal del envio en la info de Costos cuando se selecciona la opcion de envio standard
function envioStandard() {
  let cantidad = document.getElementById("Contador").value;
  let valor = cantidad * carrito.articles[0].unitCost;
  let valorStandard = ((valor / 100) * 5);
  document.getElementById("valordeEnvio").innerHTML = `${carrito.articles[0].currency + " " + valorStandard}`;
  return valorStandard;
}

//Actualiza el subtotal del envio en la info de Costos cuando se selecciona la opcion de envio express
function envioExpress() {
  let cantidad = document.getElementById("Contador").value;
  let valor = cantidad * carrito.articles[0].unitCost;
  let valorExpress = ((valor / 100) * 7);
  document.getElementById("valordeEnvio").innerHTML = `${carrito.articles[0].currency + " " + valorExpress}`;
  return valorExpress;
}

//Actualiza el subtotal del envio en la info de Costos cuando se selecciona la opcion de envio premium
function envioPremium() {
  let cantidad = document.getElementById("Contador").value;
  let valor = cantidad * carrito.articles[0].unitCost;
  let valorPremium = ((valor / 100) * 15);
  document.getElementById("valordeEnvio").innerHTML = `${carrito.articles[0].currency + " " + valorPremium}`;
  return valorPremium;
}

//Actualiza el total de la compra con la seleccion de envio standard
function totaldelacompraStandard() {
  let valorSubtotal = actualizaciondeProducto();
  let valorEnvioStandard = envioStandard();
  let totalCostos = valorSubtotal + valorEnvioStandard;
  document.getElementById("valorTotal").innerHTML = `USD ${totalCostos}`;
}

//Actualiza el total de la compra con la seleccion de envio express
function totaldelacompraExpress() {
  let valorSubtotal = actualizaciondeProducto();
  let valorEnvioExpress = envioExpress();
  let totalCostos = valorSubtotal + valorEnvioExpress;
  document.getElementById("valorTotal").innerHTML = `USD ${totalCostos}`;
}

//Actualiza el total de la compra con la seleccion de envio premium
function totaldelacompraPremium() {
  let valorSubtotal = actualizaciondeProducto();
  let valorEnvioPremium = envioPremium();
  let totalCostos = valorSubtotal + valorEnvioPremium;
  document.getElementById("valorTotal").innerHTML = `USD ${totalCostos}`;
}

//Habilita los inputs a la tarjeta de credito y deshabilita los de banco
function eleccionCredito() {
  document.getElementById("numeroCredito").removeAttribute("disabled", "");
  document.getElementById("numeroCredito").setAttribute("requiered", "");
  document.getElementById("numeroCodigo").removeAttribute("disabled", "");
  document.getElementById("numeroCodigo").setAttribute("requiered", "");
  document.getElementById("vigenciaCredito").removeAttribute("disabled", "");
  document.getElementById("vigenciaCredito").setAttribute("requiered", "");
  document.getElementById("nCuentaBanco").setAttribute("disabled", "");
  document.getElementById("nCuentaBanco").removeAttribute("requiered", "");
  document.getElementById("nCuentaBanco").value = "";
  document.getElementById("divValido3").classList.add('d-none');
  document.getElementById("divInvalido3").classList.add('d-none');
  document.getElementById("ErrorModal1").classList.add('d-none');
  document.getElementById("Estado").innerHTML = `<p class='text-success'>Has seleccionado pagar mediante tarjeta de credito</p>`
}

//Habilita los inputs del banco y deshabilita los de tarjeta de credito
function eleccionBanco() {
  document.getElementById("numeroCredito").setAttribute("disabled", "");
  document.getElementById("numeroCredito").removeAttribute("requiered", "");
  document.getElementById("numeroCredito").value = "";
  document.getElementById("numeroCodigo").setAttribute("disabled", "");
  document.getElementById("numeroCodigo").removeAttribute("requiered", "");
  document.getElementById("numeroCodigo").value = "";
  document.getElementById("vigenciaCredito").setAttribute("disabled", "");
  document.getElementById("vigenciaCredito").removeAttribute("requiered", "");
  document.getElementById("vigenciaCredito").value = "";
  document.getElementById("nCuentaBanco").removeAttribute("disabled", "");
  document.getElementById("nCuentaBanco").setAttribute("requiered", "");
  document.getElementById("divValido0").classList.add('d-none');
  document.getElementById("divInvalido0").classList.add('d-none');
  document.getElementById("divValido1").classList.add('d-none');
  document.getElementById("divInvalido1").classList.add('d-none');
  document.getElementById("divValido2").classList.add('d-none');
  document.getElementById("divInvalido2").classList.add('d-none');
  document.getElementById("ErrorModal1").classList.add('d-none');
  document.getElementById("Estado").innerHTML = `<p class='text-success'>Has seleccionado pagar mediante transferencia bancaria</p>`
}

//Funcion de validacion que se ejecuta cuando se pulsa el boton de finalizar compra
function validarCompra() {
  let validacion = false;
  let calle = document.getElementById("Calle");
  let numCalle = document.getElementById("NumeroCalle");
  let esquina = document.getElementById("Esquina");
  let tarjetaCredito = document.getElementById("Credito").checked;
  let cuentaBancaria = document.getElementById("Banco").checked;


  //validacion calle
  if (calle.value === "") {
    validacion = false;
    document.getElementById("calleInvalida").classList.remove('d-none');
    document.getElementById("calleValida").classList.add('d-none');
    calle.classList.remove('valido');
    calle.classList.add('invalido');
  } else {
    validacion = true;
    document.getElementById("calleValida").classList.remove('d-none');
    document.getElementById("calleInvalida").classList.add('d-none');
    calle.classList.add('valido');
    calle.classList.remove('invalido');
  }

  //Validacion calle a tiempo real
  calle.addEventListener('keyup', function (event) {
    if (calle.value === "") {
      validacion = false;
      document.getElementById("calleInvalida").classList.remove('d-none');
      document.getElementById("calleValida").classList.add('d-none');
      calle.classList.remove('valido')
      calle.classList.add('invalido')
    } else {
      validacion = true;
      document.getElementById("calleValida").classList.remove('d-none');
      document.getElementById("calleInvalida").classList.add('d-none');
      calle.classList.add('valido')
      calle.classList.remove('invalido')
    }
  })


  //validacion numero de calle
  if (numCalle.value === "") {
    validacion = false;
    document.getElementById("numeroInvalido").classList.remove('d-none');
    document.getElementById("numeroValido").classList.add('d-none');
    numCalle.classList.remove('valido');
    numCalle.classList.add('invalido');
  } else {
    validacion = true;
    document.getElementById("numeroValido").classList.remove('d-none');
    document.getElementById("numeroInvalido").classList.add('d-none');
    numCalle.classList.add('valido');
    numCalle.classList.remove('invalido');
  }

  //Validacion numero de calle a tiempo real
  numCalle.addEventListener('keyup', function (event) {
    if (numCalle.value === "") {
      validacion = false;
      document.getElementById("numeroInvalido").classList.remove('d-none');
      document.getElementById("numeroValido").classList.add('d-none');
      numCalle.classList.remove('valido')
      numCalle.classList.add('invalido')
    } else {
      validacion = true;
      document.getElementById("numeroValido").classList.remove('d-none');
      document.getElementById("numeroInvalido").classList.add('d-none');
      numCalle.classList.add('valido')
      numCalle.classList.remove('invalido')
    }
  })


  //Validacion esquina
  if (esquina.value === "") {
    validacion = false;
    document.getElementById("esquinaInvalida").classList.remove('d-none');
    document.getElementById("esquinaValida").classList.add('d-none');
    esquina.classList.remove('valido');
    esquina.classList.add('invalido');
  } else {
    validacion = true;
    document.getElementById("esquinaValida").classList.remove('d-none');
    document.getElementById("esquinaInvalida").classList.add('d-none');
    esquina.classList.add('valido');
    esquina.classList.remove('invalido');
  }

  //Validacion esquina a tiempo real
  esquina.addEventListener('keyup', function (event) {
    if (esquina.value === "") {
      validacion = false;
      document.getElementById("esquinaInvalida").classList.remove('d-none');
      document.getElementById("esquinaValida").classList.add('d-none');
      esquina.classList.remove('valido')
      esquina.classList.add('invalido')
    } else {
      validacion = true;
      document.getElementById("esquinaValida").classList.remove('d-none');
      document.getElementById("esquinaInvalida").classList.add('d-none');
      esquina.classList.add('valido')
      esquina.classList.remove('invalido')
    }
  })

  //validacion metodo de pago
  if (tarjetaCredito == false && cuentaBancaria == false) {
    validacion = false;
    document.getElementById("Estado").classList.add('text-danger');
    document.getElementById("Estado").innerHTML = `<p>Debe seleccionar un metodo de pago</p>`;
  } else {
    document.getElementById("Estado").classList.remove('text-danger');
    document.getElementById("Estado").classList.add('text-success');
  }

  //Funcion que despliega un alert dependiendo de la validacion
  function mostrarResultadodeCompra() {
    if (validacion === false) {
      //Si la compra fallo
      document.getElementById("compraFallo").classList.add("show");
      setTimeout(desaparecerAlerta, 1000)
    } else {
      //Si la compra fue exitosa, tambien desabilita todos los inputs y luego te manda a la pagina principal del sitio
      document.getElementById("compraExitosa").classList.add("show");
      document.getElementById("Contador").setAttribute("disabled", "");
      document.getElementById("Calle").setAttribute("disabled", "");
      document.getElementById("NumeroCalle").setAttribute("disabled", "");
      document.getElementById("Esquina").setAttribute("disabled", "");
      document.getElementById("Premium").setAttribute("disabled", "");
      document.getElementById("Express").setAttribute("disabled", "");
      document.getElementById("Standar").setAttribute("disabled", "");
      setTimeout(mandaraHomePage, 3000);
    }
  }

  //Funcion que te manda a la pagina principal del sitio
  function mandaraHomePage() {
    showSpinner();
    window.location.href = "home.html"
  }

  //Funcion para desaparecer la alerta en caso de que la compra falle
  function desaparecerAlerta() {
    setTimeout(function () {
      document.getElementById("compraFallo").classList.remove("show");
    }, 1000);
  }

  mostrarResultadodeCompra();

}





//Validacion dentro del Modal
function validacionMetododePago() {
  let tarjetaCredito = document.getElementById("Credito").checked;
  let cuentaBancaria = document.getElementById("Banco").checked;
  let numCredito = document.getElementById("numeroCredito");
  let numCodigo = document.getElementById("numeroCodigo");
  let vigencia = document.getElementById("vigenciaCredito");
  let numBanco = document.getElementById("nCuentaBanco");

  if (tarjetaCredito == false && cuentaBancaria == false) {
    document.getElementById("ErrorModal1").classList.remove('d-none');
  }

  if (tarjetaCredito) {
    document.getElementById("ErrorModal1").classList.add('d-none');
    let CreditoArray = [numCredito, numCodigo, vigencia];
    for (let i = 0; i < CreditoArray.length; i++) {
      const element = CreditoArray[i];

      if (element.checkValidity()) {
        document.getElementById("divValido" + i).classList.remove('d-none')
        document.getElementById("divInvalido" + i).classList.add('d-none')

      } else {
        document.getElementById("divValido" + i).classList.add('d-none')
        document.getElementById("divInvalido" + i).classList.remove('d-none')
      }
    }
  }
  if (cuentaBancaria) {
    document.getElementById("ErrorModal1").classList.add('d-none');
    if (numBanco.checkValidity()) {
      document.getElementById("divValido3").classList.remove('d-none')
      document.getElementById("divInvalido3").classList.add('d-none')

    } else {
      document.getElementById("divValido3").classList.add('d-none')
      document.getElementById("divInvalido3").classList.remove('d-none')
    }
  }

  //Validacion del Modal a tiempo real
  document.getElementById('formadePago').addEventListener('input', function (event) {
    let tarjetaCredito = document.getElementById("Credito").checked;
    let cuentaBancaria = document.getElementById("Banco").checked;
    //Revisa si marcaste tarjeta de credito
    if (tarjetaCredito) {
      eleccionCredito();
      let CreditoArray = [numCredito, numCodigo, vigencia];
      //Un If anidado a un For que recorre el array para hacer las validaciones
      for (let i = 0; i < CreditoArray.length; i++) {
        const element = CreditoArray[i];

        if (element.checkValidity()) {
          document.getElementById("divValido" + i).classList.remove('d-none')
          document.getElementById("divInvalido" + i).classList.add('d-none')

        } else {
          document.getElementById("divValido" + i).classList.add('d-none')
          document.getElementById("divInvalido" + i).classList.remove('d-none')
        }
      }
    };

    //Revisa si marcaste cuenta bancaria
    if (cuentaBancaria) {
      eleccionBanco();
      //Un if para realizar la validacion del numero de cuneta bancaria
      if (numBanco.checkValidity()) {
        document.getElementById("divValido3").classList.remove('d-none')
        document.getElementById("divInvalido3").classList.add('d-none')

      } else {
        document.getElementById("divValido3").classList.add('d-none')
        document.getElementById("divInvalido3").classList.remove('d-none')
      }
    }
  })
}