// Agregar array al proyecto
const muzzaGig = 960
const extra = 120
let result = 0
let pedidos = []


function nuevoPedido() {
    let pedido = {}
        alert("Bienvenidos Pizzeria Canavaro \n Muzzarella Gigante $960 - Extra muzza $120 \n LLevando mas de 5 pizzas tenes un 10% de descuento \n Aceptamos Tarjetas, 5% de recargo")
        let domicilio = prompt("Ingrese su domicilio de envio por favor.")
        let cantPizzas = prompt("¿Cuantas desea llevar?")
        let extraMuzza = prompt("¿Desea agregar Extra Muzza? (S) o (N)")
        pedido.id = Math.round(Math.random() * (1000 - 0) + 0)
        pedido.domicilio = domicilio
        pedido.cantidadDePizzas = cantPizzas
        pedido.extraMuzzarella

        muzzaExtra(extraMuzza, cantPizzas, pedido)
        descuentoPorCantidad(cantPizzas, pedido)

        pedidos.push(pedido)
        let mensaje2 = prompt("¿Quieres realizar un pedido? (S) o (N)")
        if (mensaje2 === "s") {
            nuevoPedido()
        } else {
            alert("Gracias! te avisaremos cuando este en camino!")
        }
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
        let medioPago = prompt("el total del pedido con descuento es  $" + result + "\n Pago en efectivo(E) o Tarjeta(T) ? \n el pago con tarjeta tiene un recargo del 5%  ")
        mediosDePago(medioPago, pedido)
    } else {
        medioPago = prompt("el total del pedido es  $" + result + "\n Pago en efectivo(E) o Tarjeta(T) ? \n el pago con tarjeta tiene un recargo del 5%")
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



nuevoPedido()
let busqueda = prompt("Realizar una busqueda por el precio")
let bus = pedidos.find(e => e.total == busqueda)

console.log("Busqueda por precio")
console.log(bus)

console.log("Pedidos generados")
const datos = pedidos.map(pedido => pedido)
console.log(datos)

console.log("Pedidos Filtrados")
let filtrado = pedidos.filter( e => e.total < 5000)
console.log(filtrado);







