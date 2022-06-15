// Agregar array al proyecto
const muzzaGig = 1200
const extra = 200
let result = 0
let pedidos = []

const formulario = document.querySelector('#formulario')
const cardPedido = document.getElementById('cards-pedidos')
cardPedido.className = "row p-2"

function nuevoPedido(e) {
    e.preventDefault()
    let pedido = {}
    let domicilio = formulario.domicilio.value
    let cantPizzas = formulario.cantidad.value
    let extraMuzza = formulario.extra.value
    pedido.id = Math.round(Math.random() * (1000 - 0) + 0)
    pedido.domicilio = domicilio
    pedido.cantidadDePizzas = cantPizzas

    muzzaExtra(extraMuzza, cantPizzas, pedido)
    descuentoPorCantidad(cantPizzas, pedido)
    pedidos.push(pedido)
    document.getElementById("formulario").reset();

}

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

formulario.addEventListener('submit', nuevoPedido)

const mostrarPedidos = () => {

    if (!pedidos.length) {
        console.log("sinpedidos");
        const contenedor = document.createElement("div")
        contenedor.className = "container"
        contenedor.innerHTML = '<p>sin pedidos</p>'
        document.body.appendChild(contenedor)
    } else {
        pedidos.map(pedido => {
            const contenedor = document.createElement("div")
            contenedor.className = "col-4"
            contenedor.innerHTML = `
        <div class="card text-white bg-primary mb-3 container"  style="max-width: 18rem;">${pedido.id}
        <div class="">Domicilio: ${pedido.domicilio}</div>
        <div class="card-body">
        <p class="card-text">${pedido.cantidadDePizzas} Muzzarella Gigantes</p>
        <p class="card-text">Extra muzza: ${pedido.extraMuzza} </p>
        <h5>Total: $ ${pedido.total}</h5>
        </div>
        </div>
        `
            cardPedido.appendChild(contenedor)
        })

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







