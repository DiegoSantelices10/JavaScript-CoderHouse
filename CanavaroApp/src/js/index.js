const muzzaGig = 1200;
const extra = 200;
let result = 0;
let pedidos = [];
const cardPizza = document.getElementById("pizzas");

let pizzas = [
    {
        id: 1,
        nombre: "Muzzarella",
        descripcion: "Muzzarella con aceitunas",
        imagen: "https://live.staticflickr.com/65535/49084210211_f3e458f01a_m.jpg",
            chica: { precio: 1200 },
            mediana: { precio: 1400 },
            grande: { precio: 1600 },
    },
    {
        id: 2,
        nombre: "Jamon y Morrones",
        descripcion: "Muzzarella, Jamon y Morron rojo",
        imagen: "https://live.staticflickr.com/65535/49084418617_4409f4484d_m.jpg",
            chica: { precio: 1400 },
            mediana: { precio: 1600 },
            grande: { precio: 1800 },
    },
    {
        id: 3,
        nombre: "Napolitana con Jamon",
        descripcion: "Muzzarella, Jamon, Tomate, Provolone y Provenzal",
        imagen: "https://live.staticflickr.com/65535/49084418322_0b46e97696_m.jpg",
            chica: { precio: 1350 },
            mediana: { precio: 1500 },
            grande: { precio: 1800 },
    },
    {
        id: 4,
        nombre: "Panceta",
        descripcion: "Muzzarella, Panceta y Provolone",
        imagen: "https://live.staticflickr.com/65535/49084210136_3d3cde77b7_m.jpg",
            chica: { precio: 1500 },
            mediana: { precio: 1800 },
            grande: { precio: 2000 },
    },
    {
        id: 5,
        nombre: "Caprese",
        descripcion: "Muzzarella, Tomate y Albahaca",
        imagen: "https://live.staticflickr.com/65535/49084418357_397e7e5ab5_m.jpg",
            chica: { precio: 1200 },
            mediana: { precio: 1400 },
            grande: { precio: 1600 },
    },
];
  
agregarCarrito = {}

    pizzas.map((pizza) => {
        const contenedor = document.createElement("div");
        contenedor.className = "shadow-sm p-2 mb-3 bg-white rounded d-flex justify-content-between align-items-center"
        contenedor.innerHTML = `
                                <img
                                    key="${pizza.id}"
                                    src="${pizza.imagen}"
                                    class="img-pizza"
                                    alt="caprese"
                                />
                                <div class="p-2  w-100">
                                    <h5 class="m-0">${pizza.nombre}</h4>
                                    <p class="m-0 ">${pizza.descripcion}</p>
                                    <p class="m-0 fw-bold">${pizza.grande.precio}</p>
                                </div>
                            <div>
                            <a name="agregar" id="${pizza.id}"  class="btn btn-outline-light text-primary p-3 shadow-sm fw-bold rounded-pill" href="#" role="button">Agregar</a>
                            </div> `;
                            cardPizza.appendChild(contenedor);
                            document.getElementById(`${pizza.id}`).addEventListener("click", () => {
                                agregarCarrito.id = pizza.id
                                agregarCarrito.Nombre = pizza.nombre
                                agregarCarrito.tamanio = pizza.grande
                                agregarCarrito.precio = pizza.precio

                    
                                    } )
    })


console.log(agregarCarrito);
    

    // Metodo cuando comienza el proyecto
    function nuevoPedido(e) {
        // es un evento que ayuda a que no se refresque la pagina cuando apretas el boton de enviar
        e.preventDefault();

        let pedido = {};
        // guardamos en variables los datos que obtenemos del formmulario
        let domicilio = formulario.apellido.value;
        let cantPizzas = formulario.cantidad.value;
        let extraMuzza = formulario.extra.value;

        // Almacenamos los datos en el objeto pedido{}
        pedido.id = Math.round(Math.random() * (1000 - 0) + 0);
        pedido.domicilio = domicilio;
        pedido.cantidadDePizzas = cantPizzas;

        //Ejecutamos las funciones creadas abajo
        muzzaExtra(extraMuzza, cantPizzas, pedido);
        descuentoPorCantidad(cantPizzas, pedido);

        //Guardamos el objeto pedido en el array Pedidos
        pedidos.push(pedido);

        // Me limpia el formulario luego de apretar en boton de enviar con el .reset()
        document.getElementById("formulario").reset();
    }

    //metodo de muzzarella Extra
    const muzzaExtra = (value, cantPizzas, pedido) => {
        if (value === "s") {
            let muzzEx = muzzaGig + extra;
            pedido.extraMuzza = "Si";
            for (let i = 1; i <= cantPizzas; i++) {
                result = result + muzzEx;
            }
        }
        if (value === "n") {
            pedido.extraMuzza = "No";
            for (let i = 1; i <= cantPizzas; i++) {
                result = result + muzzaGig;
            }
        }
    };

    // Metodo Descuento por Cantidad
    const descuentoPorCantidad = (value, pedido) => {
        if (value >= 5) {
            result = result - (result / 100) * 10;
            let medioPago = formulario.medioPago.value;
            mediosDePago(medioPago, pedido);
        } else {
            medioPago = formulario.medioPago.value;
            mediosDePago(medioPago, pedido);
        }
    };

    // Metodo Medio De Pago
    const mediosDePago = (value, pedido) => {
        if (value === "t") {
            result = result + (result / 100) * 5;
            pedido.medioDePago = "Tarjeta";
            pedido.total = result;
            alert("El total del pedido pagado con tarjeta es $: " + result);
            result = 0;
        } else if (value === "e") {
            pedido.medioDePago = "Efectivo";
            pedido.total = result;
            alert("El total del pedido es $: " + result);
            result = 0;
        }
    };


    //visualizar todos los objetos que tenemos guardados en el Arrays Principal
    // Se ejecuta cuando el usuario apreta el boton que tiene el evento onClick=mostrarPedido() que es la funcion que seleccionamos
    const mostrarPedidos = () => {
        if (!pedidos.length) {
            const contenedor = document.createElement("div");
            contenedor.className = "container";
            contenedor.id = "pedidos-cards";
            contenedor.innerHTML = "<p>sin pedidos</p>";
            cardPedido.appendChild(contenedor);
        } else {
            pedidos.map((pedido) => {
                const contenedor = document.createElement("div");
                contenedor.className = "col-4 container";
                contenedor.id = "pedidos-cards";
                contenedor.innerHTML = `
                            <div class="card text-white bg-primary mb-3 container"  style="max-width: 18rem;">${pedido.id}
                            <div class="">Domicilio: ${pedido.domicilio}</div>
                            <div class="card-body">
                            <p class="card-text">${pedido.cantidadDePizzas} Muzzarella Gigantes</p>
                            <p class="card-text">Extra muzza: ${pedido.extraMuzza} </p>
                            <h5 >Total: $ ${pedido.total}</h5>
                            </div>
                            </div>
                            `;
                cardPedido.appendChild(contenedor);
            });
        }
    };

    const ocultar = () => {
        let element = document.getElementById("cards-pedidos");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };

// const datos = pedidos.map(pedido => pedido)
// console.log(datos)

// let busqueda = prompt("Realizar una busqueda por el precio")
// let bus = pedidos.find(e => e.total == busqueda)

// console.log("Busqueda por precio")
// console.log(bus)

// console.log("Pedidos Filtrados")
// let filtrado = pedidos.filter( e => e.total < 5000)
// console.log(filtrado);
