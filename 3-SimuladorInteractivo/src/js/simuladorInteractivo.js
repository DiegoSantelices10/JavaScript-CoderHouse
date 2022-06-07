// Crear un algoritmo con Ciclos Iteraciones
let cantPizzas = prompt( "Ingrese la cantidad de pizzas que va llevar")
let extraMuzza = prompt("Desea agregar Extra Muzza?  S/N")

let muzzaGig = 960
let extra = 120
let result = 0

const muzzaExtra = (value) => {
    if ( value === "s") {
        let muzzEx = muzzaGig+extra 
        for (let i = 1 ; i <= cantPizzas ; i ++ ) { result = result + muzzEx }
    } 
    if (value === "n") {
        for (let i = 1 ; i <= cantPizzas ; i ++ ) { result = result + muzzaGig }
    }   
}


const descuentoPorCantidad = (value) => {
    if (value >= 5 ) { 
        result = result - (result/100) * 10
         let medioPago =  prompt("el total del pedido con descuento es  $" + result + "\n Pago en efectivo(e) o Tarjeta(t) ? \n el pago con tarjeta tiene un recargo del 5%  ")
            pagoConTarjeta(medioPago)
        } else {
       medioPago = prompt("el total del pedido es  $" + result + "\n Pago en efectivo(e) o Tarjeta(t) ? \n el pago con tarjeta tiene un recargo del 5%")
       pagoConTarjeta(medioPago)
    }  
}

const pagoConTarjeta = (value) =>{

    if(value === "t") {
        result = result + (result/100) * 5
        alert("El total del pedido pagado con tarjeta es : " + result)
    }
        if (value === "e")
            return alert("El total del pedido pagado con efectivo es : " + result)

}






    muzzaExtra(extraMuzza)
    descuentoPorCantidad(cantPizzas)
    pagoConTarjeta()










// console.log("Extra Muzza $120")
// console.log("Ingrese la cantidad de pizzas que desea llevar")


