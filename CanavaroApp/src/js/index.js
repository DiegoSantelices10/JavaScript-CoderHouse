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
let pedido = {}
let pizzas = []





// Ocultamos el botton hasta que el usuario seleccione un producto
btnPedido.style.visibility = "hidden"

// Generamos un Evento donde se ejecuta la funcion btnSumarRestar()
tbody.addEventListener("click", (e) => btnSumarRestar(e))


const pedirDatos = async () => {
    await fetch('../src/datosJSON/datos.json')
    .then(res => res.json())
    .then(datos => 
        datos.map(({ id, imagen, nombre, descripcion, precio }) => {
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
            document.getElementById(`${id}`).addEventListener("click", () => { addCarrito(contenedor) })
        })
        )}
pedirDatos()


// Al seleccionar una pizza agregamos los datos en un objeto PRODUCTO
const addCarrito = items => {
let producto = {}
        producto.id = items.querySelector('button').id,
        producto.nombre = items.querySelector('h5').textContent,
        producto.precio = parseInt(items.querySelector('p').textContent),
        producto.cantidad = 1

let result = pizzas.find( element => element.id === producto.id)

!result? pizzas.push(producto) : result.cantidad++
    
pintarCarrito()
}

// Ya con los productos seleccionados iteramos el carrito para pintarlo en el DOM
const pintarCarrito = () => {
    tbody.innerHTML = ""
    Object.values(pizzas).map(({ id, nombre, cantidad, precio }) => {
        const contenedor = document.createElement("tr");
        contenedor.accessKey = `${id}`
        contenedor.innerHTML = ` <td>${nombre}</td>
                               <td>${cantidad}</td>
                               <td>
                                  <button accessKey="${id}" class="mx-1 shadow-sm fw-bold text-danger rounded px-1 border-0 bg-white" type="button" >-</button>
                                  <button accessKey="${id}" class="shadow-sm text-primary fw-bold rounded px-1 border-0 bg-white" type="button" >+</button>
                               </td>
                               <td>$ ${precio * cantidad}</td>`
        tbody.appendChild(contenedor)
    })
    totales()
}

// Aca Realizamos la logica del precio total y la cantidad total de los productos seleccionados
// que luego lo pintamos en el DOM
const totales = () => {
    tfoot.innerHTML = ""
    let cantidadTotal = Object.values(pizzas).reduce((acc, carrito) => acc + carrito.cantidad, 0)
    let precioTotal = Object.values(pizzas).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    const contenedor = document.createElement("tr")
    contenedor.innerHTML = ` <th>TOTALES</th>
                                <th>${cantidadTotal}</th>
                                <th></th>
                                <th>$ ${precioTotal}</th>`
    tfoot.appendChild(contenedor)
    btnPedido.style.visibility = "visible"
}


// Aca se desarrolla la logica de los botones de sumar o restar cantidades de los productos
const btnSumarRestar = (e) => {
    if (e.target.classList.contains('text-primary')) {
        let result = pizzas.find( element => element.id === e.target.accessKey)
         result.cantidad++
         pintarCarrito()

    }
    if (e.target.classList.contains('text-danger')) {
        let result = pizzas.find( element => element.id === e.target.accessKey)
        result.cantidad--

    
    }
    pintarCarrito()
}

// Lo logica de este evento es pintar la informacion del carrito en el Modal
// Iteramos el objeto carrito
btnPedido.addEventListener("click", () => {
    tableModal.innerHTML = ""
    totalModal.innerHTML = ""
    Object.values(pizzas).forEach(({ nombre, cantidad, precio }) => {
        const contenedor = document.createElement("tr");
        contenedor.innerHTML = ` <td>${nombre}</td>
                                   <td>${cantidad}</td>
                                   <td></td>
                                   <td>$ ${precio * cantidad}</td> `
        tableModal.appendChild(contenedor)
    })

    let cantidadTotal = Object.values(pizzas).reduce((acc, { cantidad }) => acc + cantidad, 0)
    let precioTotal = Object.values(pizzas).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    const tr = document.createElement("tr")
    tr.innerHTML = `<th>TOTAL</th>
                           <th>${cantidadTotal}</th>
                           <th></th>
                           <th>$ ${precioTotal}</th>`
    totalModal.appendChild(tr)
})


// La logica de este evento es la confirmacion del pedido, donde guardamos el objeto carrito en el array pedidos
// Para luego almacenar la informacion en el localStorage
btnConfirmar.addEventListener("click", (e) => {
    e.preventDefault()
    let precioTotal = Object.values(pizzas).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    pedido.productos = {...pizzas}
    pedido.total = precioTotal
    pedido.direccion = inputDireccion.value
    console.log(pedido)
    pedidos.push(pedido)
    localStorage.setItem('pedidos', JSON.stringify(pedidos))
    Swal.fire({
        icon: 'success',
        title: 'Pedido Confirmado',
        text: 'Te avisaremos cuando tu pedido este en camino!',
        timer: 3500
    })
    tbody.innerHTML = ""
    tfoot.innerHTML = ""
    inputDireccion.value = ""
    pizzas = []
    pedido = {}
    btnPedido.style.visibility = "hidden"
})

