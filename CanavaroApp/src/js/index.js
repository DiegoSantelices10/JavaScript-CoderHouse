const muzzaGig = 1200
const extra = 200
let result = 0
let pedidos = []


// obtenemos del HTML los datos del formulario con el ID = formulario
const formulario = document.querySelector('#formulario')

// obtenemos del HTML el nodo que es un DIV con el id cards-pedidos
const cardPedido = document.getElementById('cards-pedidos')

// a cardPedido le asignamos una clase con los valores correspondientes
cardPedido.className = "row p-2"

// Metodo cuando comienza el proyecto
function nuevoPedido(e) {
    // es un evento que ayuda a que no se refresque la pagina cuando apretas el boton de enviar
    e.preventDefault()


    let pedido = {}
    // guardamos en variables los datos que obtenemos del formmulario
    let domicilio = formulario.apellido.value
    let cantPizzas = formulario.cantidad.value
    let extraMuzza = formulario.extra.value

    // Almacenamos los datos en el objeto pedido{}
    pedido.id = Math.round(Math.random() * (1000 - 0) + 0)
    pedido.domicilio = domicilio
    pedido.cantidadDePizzas = cantPizzas


    //Ejecutamos las funciones creadas abajo
    muzzaExtra(extraMuzza, cantPizzas, pedido)
    descuentoPorCantidad(cantPizzas, pedido)
    
    //Guardamos el objeto pedido en el array Pedidos
    pedidos.push(pedido)

    // Me limpia el formulario luego de apretar en boton de enviar con el .reset()
    document.getElementById("formulario").reset();

}

//metodo de muzzarella Extra
const muzzaExtra = (value, cantPizzas, pedido) => {
    if (value === "s") {
        let muzzEx = muzzaGig + extra
        pedido.extraMuzza = "Si"
        for (let i = 1; i <= cantPizzas; i++) { result = result + muzzEx }

    }
    if (value === "n") {
        pedido.extraMuzza = "No"
        for (let i = 1; i <= cantPizzas; i++) { result = result + muzzaGig }
    }
}

// Metodo Descuento por Cantidad
const descuentoPorCantidad = (value, pedido) => {
    if (value >= 5) {

        result = result - (result / 100) * 10
        let medioPago = formulario.medioPago.value
        mediosDePago(medioPago, pedido)
    } else {
        medioPago = formulario.medioPago.value
        mediosDePago(medioPago, pedido)
    }
}

// Metodo Medio De Pago
const mediosDePago = (value, pedido) => {

    if (value === "t") {
        result = result + (result / 100) * 5
        pedido.medioDePago = "Tarjeta"
        pedido.total = result
        alert("El total del pedido pagado con tarjeta es $: " + result)
        result = 0

    } else if (value === "e") {
        pedido.medioDePago = "Efectivo"
        pedido.total = result
        alert("El total del pedido es $: " + result)
        result = 0

    }

}


// Es un evento que se ejecuta cuando el usuario apreta el boton SUBMIT del formulario, donde ejecuta una funcion
//que en este caso es nuevoPedido, que es la función que tenemos arriba
formulario.addEventListener('submit', nuevoPedido)


//visualizar todos los objetos que tenemos guardados en el Arrays Principal
// Se ejecuta cuando el usuario apreta el boton que tiene el evento onClick=mostrarPedido() que es la funcion que seleccionamos
const mostrarPedidos = () => {
    if (!pedidos.length) {
            const contenedor = document.createElement("div")
            contenedor.className = "container"
            contenedor.id = "pedidos-cards"
            contenedor.innerHTML = '<p>sin pedidos</p>'
            cardPedido.appendChild(contenedor)
    } else {

        pedidos.map(pedido => {
          const contenedor = document.createElement("div")
            contenedor.className = "col-4 container"
            contenedor.id = "pedidos-cards"
            contenedor.innerHTML = `
                            <div class="card text-white bg-primary mb-3 container"  style="max-width: 18rem;">${pedido.id}
                            <div class="">Domicilio: ${pedido.domicilio}</div>
                            <div class="card-body">
                            <p class="card-text">${pedido.cantidadDePizzas} Muzzarella Gigantes</p>
                            <p class="card-text">Extra muzza: ${pedido.extraMuzza} </p>
                            <h5 >Total: $ ${pedido.total}</h5>
                            </div>
                            </div>
                            `
            cardPedido.appendChild(contenedor)
        })
    }
}


const ocultar = () => {
    let element = document.getElementById("cards-pedidos");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
}


// const datos = pedidos.map(pedido => pedido)
// console.log(datos)


// let busqueda = prompt("Realizar una busqueda por el precio")
// let bus = pedidos.find(e => e.total == busqueda)

// console.log("Busqueda por precio")
// console.log(bus)



// console.log("Pedidos Filtrados")
// let filtrado = pedidos.filter( e => e.total < 5000)
// console.log(filtrado);







