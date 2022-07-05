// declaracion de variables donde obtenemos nodos del DOM
const btnPedido = document.getElementById("buttonPedido")
const btnConfirmar = document.getElementById("confirmarPedido")
const cardPizza = document.getElementById("pizzas")
const tbody = document.querySelector(".tableCarrito")
const tfoot = document.querySelector(".tableTotales")
const tableModal = document.querySelector(".tableModal")
const totalModal = document.querySelector(".totalModal")
const seguirComprando = document.getElementById('seguirComprando')
const inputDireccion = document.getElementById('inputDireccion')
let pedidos = []
let carrito = {
}
let producto = {}

// Ocultamos el botton hasta que el usuario seleccione un producto
btnPedido.style.visibility = "hidden"

// Generamos un Evento donde se ejecuta la funcion btnSumarRestar()
tbody.addEventListener("click", (e) => btnSumarRestar(e) )




// Array de los productos
let pizzas = 
[
    {
        id: 1,
        nombre: "Muzzarella",
        descripcion: "Muzzarella con aceitunas",
        imagen: "https://live.staticflickr.com/65535/49084210211_f3e458f01a_m.jpg",
        tamanio: "Grande",
        precio: 1200
    },
    {
        id: 2,
        nombre: "Jamon y Morrones",
        descripcion: "Muzzarella, Jamon y Morron rojo",
        imagen: "https://live.staticflickr.com/65535/49084418617_4409f4484d_m.jpg",
        tamanio: "Grande",
        precio: 1300
    },
    {
        id: 3,
        nombre: "Napolitana con Jamon",
        descripcion: "Muzzarella, Jamon, Tomate, Provolone y Provenzal",
        imagen: "https://live.staticflickr.com/65535/49084418322_0b46e97696_m.jpg",
        tamanio: "Grande",
        precio: 1500
    },
    {
        id: 4,
        nombre: "Panceta",
        descripcion: "Muzzarella, Panceta y Provolone",
        imagen: "https://live.staticflickr.com/65535/49084210136_3d3cde77b7_m.jpg",
        tamanio: "Grande",
        precio: 1800
    },
    {
        id: 5,
        nombre: "Caprese",
        descripcion: "Muzzarella, Tomate y Albahaca",
        imagen: "https://live.staticflickr.com/65535/49084418357_397e7e5ab5_m.jpg",
        tamanio: "Grande",
        precio: 1600
    },
    {
    id: 6,
    nombre: "Provolone Con Jamon",
    descripcion: "Muzzarella, Jamon y provolone",
    imagen: "https://live.staticflickr.com/65535/49084418122_af641d871a_m.jpg",
    tamanio: "Grande",
    precio: 1600
    },
    {
    id:7,
    nombre: "Provenzal",
    descripcion: "Muzzarella y Provenzal",
    imagen: "	https://live.staticflickr.com/65535/49084418242_b5503b8fdf_m.jpg",
    tamanio: "Grande",
    precio: 1550
    },
    {
    id:8,
    nombre: "Fugazzeta",
    descripcion: "Muzzarella, Cebolla y Provolone",
    imagen:"https://live.staticflickr.com/65535/49084419067_7d49c04d7b_m.jpg",
    tamanio: "Grande",
    precio: 1640
    },
    {
    id:9,
    nombre: "Panceta con Verdeo",
    descripcion: "Muzzarella, Panceta y Cebolla de Verdeo",
    imagen:"	https://live.staticflickr.com/65535/49084210156_bf589452e3_m.jpg",
    tamanio: "Grande",
    precio: 1840
    },
    {
    id:10,
    nombre: "Anchoas",
    descripcion: "Muzzarella, Salsa de Tomate y Anchoas",
    imagen: "https://live.staticflickr.com/65535/49084419107_257f0d1190_m.jpg",
    tamanio: "Grande",
    precio: 2000
}
];

// Iteramos el array de pizzas y lo mostramos en el DOM
pizzas.map(({id, imagen, nombre, descripcion, precio}) => {
    const contenedor = document.createElement("div");
    contenedor.className = "shadow-sm p-2 mb-3 bg-white rounded-3 d-flex justify-content-between align-items-center contenido"
    contenedor.innerHTML = ` <img key="${id}" src="${imagen}" class="img-pizza" alt="${nombre}"/>
                                <div class="p-2  w-100">
                                    <h5 class="m-0 fw-bold text-uppercase">${nombre}</h5>
                                    <h6 class="m-0 fst-normal">${descripcion}</h6>
                                    <p class="m-0 fw-bold">${precio}</p>
                                </div>
                                <div>
                                    <button name="agregar" id="${id}"  
                                            class="mx-1 shadow-sm fw-bold text-dark fs-4 rounded px-1 border-0 bg-white" 
                                            type="button">+</button>
                                </div> `;
             cardPizza.appendChild(contenedor);
             document.getElementById(`${id}`).addEventListener("click", () => {addCarrito(contenedor)} )
})

// Al seleccionar una pizza agregamos los datos en un objeto PRODUCTO
const addCarrito = items => {
        producto.id = items.querySelector('button').id,
        producto.nombre = items.querySelector('h5').textContent,
        producto.precio = parseInt(items.querySelector('p').textContent),
        producto.cantidad = 1
// El metodo hasOwnProperty devuelve un booleano donde indica si el parametro indicado existe
// Si existe le agregamos una unidad al producto.cantidad 
// Caso contrario pintamos el carrito con los datos del objeto producto
if(carrito.hasOwnProperty(producto.id)) {
    
    producto.cantidad += carrito[producto.id].cantidad
}
 carrito[producto.id] = {...producto}
        pintarCarrito()
}

// Ya con los productos seleccionados iteramos el carrito para pintarlo en el DOM
const pintarCarrito = () => {
    tbody.innerHTML = ""
  
    Object.values(carrito).map(({id, nombre, cantidad, precio}) => {
const contenedor = document.createElement("tr");
      contenedor.accessKey= `${id}` 
      contenedor.innerHTML = ` <td>${nombre}</td>
                               <td>${cantidad}</td>
                               <td>
                                  <button accessKey="${id}" class="mx-1 shadow-sm fw-bold text-danger rounded px-1 border-0 bg-white" type="button" >-</button>
                                  <button accessKey="${id}" class="shadow-sm text-primary fw-bold rounded px-1 border-0 bg-white" type="button" >+</button>
                               </td>
                               <td>${precio * cantidad}</td>`
            tbody.appendChild(contenedor)   
        })
        totales()
    }

 // Aca Realizamos la logica del precio total y la cantidad total de los productos seleccionados
 // que luego lo pintamos en el DOM
const totales = () => {
    tfoot.innerHTML = ""
 let cantidadTotal = Object.values(carrito).reduce((acc, carrito ) => acc + carrito.cantidad, 0)
   let precioTotal = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

const contenedor = document.createElement("tr")
      contenedor.innerHTML =  ` <th>TOTALES</th>
                                <th>${cantidadTotal}</th>
                                <th></th>
                                <th>${precioTotal}</th>`
            tfoot.appendChild(contenedor)
            btnPedido.style.visibility = "visible"
    }


// Aca se desarrolla la logica de los botones de sumar o restar cantidades de los productos
const btnSumarRestar = (e) => {
    if (e.target.classList.contains('text-primary')) {
        const producto = carrito[e.target.accessKey]
        producto.cantidad++
        carrito[e.target.accessKey] = {...producto}
        pintarCarrito()
         
    }
    if (e.target.classList.contains('text-danger')) 
        {
        const producto = carrito[e.target.accessKey]
        producto.cantidad--
        producto.cantidad === 0 ? delete carrito[e.target.accessKey]: carrito[e.target.accessKey] = {...producto}
        }
        pintarCarrito()
    }
    
// Lo logica de este evento es pintar la informacion del carrito en el Modal
// Iteramos el objeto carrito
btnPedido.addEventListener("click", () => {
    tableModal.innerHTML = ""
    totalModal.innerHTML = ""
    Object.values(carrito).forEach(({nombre, cantidad, precio}) => {
    const contenedor = document.createElement("tr");
          contenedor.innerHTML = ` <td>${nombre}</td>
                                   <td>${cantidad}</td>
                                   <td></td>
                                   <td>${precio * cantidad}</td> `    
          tableModal.appendChild(contenedor)})
          
        let  cantidadTotal = Object.values(carrito).reduce((acc, {cantidad} ) => acc + cantidad, 0)
        let  precioTotal =   Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
          carrito.total = precioTotal
    const tr = document.createElement("tr")
          tr.innerHTML =  `<th>TOTAL</th>
                           <th>${cantidadTotal}</th>
                           <th></th>
                           <th>${precioTotal}</th>`
            totalModal.appendChild(tr)
        })


// La logica de este evento es la confirmacion del pedido, donde guardamos el objeto carrito en el array pedidos
// Para luego almacenar la informacion en el localStorage
btnConfirmar.addEventListener("click", (e) => {
      e.preventDefault()
      carrito.direccion = inputDireccion.value
      pedidos.push(carrito)
      localStorage.setItem('pedidos', JSON.stringify(pedidos))
      tbody.innerHTML = "" 
      tfoot.innerHTML = ""
      inputDireccion.value = ""
      carrito = {}
      btnPedido.style.visibility = "hidden"
    })

  