// Crear un algoritmo con un dondicional

let cantPizzas = prompt("1-Muzzarella Gigante $960\n Extra Muzza $120 \n Ingrese la cantidad de pizzas que va llevar")
let extraMuzza = prompt("Desea agregar Extra Muzza?  S/N")

let muzzaGig = 960
let extra = 120
let result 

if (extraMuzza == "s" ) { 
 result = (muzzaGig + extra) * cantPizzas
} else {
result = cantPizzas * muzzaGig
}

alert("El total de su pedido es $" + result);




// console.log("Extra Muzza $120")
// console.log("Ingrese la cantidad de pizzas que desea llevar")



