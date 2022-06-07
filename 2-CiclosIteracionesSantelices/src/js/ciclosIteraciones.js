// Crear un algoritmo con Ciclos Iteraciones

let cantPizzas = prompt( "Ingrese la cantidad de pizzas que va llevar")
let extraMuzza = prompt("Desea agregar Extra Muzza?  S/N")

let muzzaGig = 960
let extra = 120
let result = 0


if ( extraMuzza == "s") {
    let muzzEx = muzzaGig+extra 
        for (let i = 1 ; i <= cantPizzas ; i ++ ) {
            result = result + muzzEx
}
} else {
    for (let i = 1 ; i <= cantPizzas ; i ++ ) {
        result = result + muzzaGig
}
} 

if (cantPizzas >= 5 ) { 
    result = result - (result/100) * 10
    alert("el total del pedido con descuento es  $" + result)
} else {

    alert("el total del pedido es  $" + result)
}







// console.log("Extra Muzza $120")
// console.log("Ingrese la cantidad de pizzas que desea llevar")


