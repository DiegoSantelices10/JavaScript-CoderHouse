const datosUser = JSON.parse(localStorage.getItem('datosUser'))


if(!datosUser) {
    console.log("entre");
window.location.href = "./login.html"   
}
// declaracion de variables donde obtenemos nodos del DOM
const btnPedido = document.getElementById("buttonPedido")
const btnConfirmar = document.getElementById("confirmarPedido")
const cardPizza = document.getElementById("cardsPizzas")
const tableModal = document.querySelector(".tableModal")
const totalModal = document.querySelector(".totalModal")
const seguirComprando = document.getElementById('seguirComprando')
const contadorCarrito = document.getElementById('contadorCarrito')
const selectProducto = document.getElementById('selectProducto')
const pizzas = document.getElementById("pizzas")
const empanadas = document.getElementById("empanadas")
let pedidos = []
let pedido = {}
let productos = []

selectProducto.addEventListener('click', (e) => { 
    e.preventDefault()
    if(pizzas.id == e.target.id){
       pizzas.className= "active" 
       empanadas.className= ""
    } else if (empanadas.id == e.target.id) {
        empanadas.className= "active"
        pizzas.className= ""
    }
    
    obtenerProductos(e.target.id) 
})



// Obtenemos los datos de un archivo JSON local y lo mostramos en el DOM
const obtenerProductos = async (dato) => {
    await fetch('../src/datosJSON/datos.json')
    .then(res => res.json())
    .then(datos => cardProducto(datos[dato]))}


    const cardProducto = (dato) => {
        cardPizza.innerHTML = ""
        Object.values(dato).map(({id, nombre, imagen, descripcion, precio}) => {
        const contenedor = document.createElement("div");
        contenedor.className = "grid-item bg-white p-2 rounded"
        contenedor.innerHTML = ` <div class="rounded-3 d-flex justify-content-between cards">
        <img key="${id}" src="${imagen}" class="img-pizza rounded" alt="${nombre}"/>
                                    <div class="w-100" style="padding-left: 10px;">
                                        <h5 class="m-0 titulo text-uppercase">${nombre}</h5>
                                        <h6 class="descripcion">${descripcion}</h6>
                                        <p class="m-0 fw-bold precio" >$<span>${precio}</span></p>
                                    </div>
                                    <div>
                                        <button name="agregar" id="${id}"  
                                                class="mx-1 shadow-sm fw-bold text-dark fs-4 rounded px-1 border-0 bg-white" 
                                                type="button">+
                                        </button>
                                    </div>
                                </div>
                                `;
        cardPizza.appendChild(contenedor);
        document.getElementById(`${id}`).addEventListener("click", () => { addCarrito(contenedor) })})
        
    }

// Al seleccionar una pizza agregamos los datos en un objeto PRODUCTO
const addCarrito = items => {
let producto = {}
        producto.id = items.querySelector('button').id,
        producto.nombre = items.querySelector('h5').textContent,
        producto.precio = parseInt(items.querySelector('span').textContent),
        producto.cantidad = 1


let result = productos.find( element => element.id === producto.id)

!result? productos.push(producto) : result.cantidad++
    cantidadCarrito()
}
// Actualizamos el valor de la cantidad carrito
const cantidadCarrito = () => {
    contadorCarrito.innerText =  Object.values(productos).reduce((acc, { cantidad }) => acc + cantidad, 0)
}

// Mostramos los productos agregados en el modal
const pintarModal = () => {
    tableModal.innerHTML = ""
    totalModal.innerHTML = ""
    Object.values(productos).forEach(({ nombre, cantidad, precio, id }) => {
        const contenedor = document.createElement("tr");
        contenedor.innerHTML = ` <td>${nombre}</td>
                                   <td>${cantidad}</td>
                                   <td>
                                        <button accessKey="${id}" class="mx-1 shadow-sm fw-bold text-danger rounded px-1 border-0 bg-white" type="button" >-</button>
                                        <button accessKey="${id}" class="shadow-sm text-primary fw-bold rounded px-1 border-0 bg-white" type="button" >+</button>
                                   </td>
                                   <td>$ ${precio * cantidad}</td> `
        tableModal.appendChild(contenedor)
    })

    let cantidadTotal = Object.values(productos).reduce((acc, { cantidad }) => acc + cantidad, 0)
    let precioTotal = Object.values(productos).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    console.log(productos);
    const tr = document.createElement("tr")
          tr.innerHTML = `<th>TOTAL</th>
                           <th>${cantidadTotal}</th>
                           <th></th>
                           <th>$ ${precioTotal}</th>`
    totalModal.appendChild(tr)
}

// Aca se desarrolla la logica de los botones de sumar o restar cantidades de los productos
const btnSumarRestar = (e) => {
    if (e.target.classList.contains('text-primary')) {
        let result = productos.find( element => element.id === e.target.accessKey)
         result.cantidad++
        pintarModal()
    }
    if (e.target.classList.contains('text-danger')) {
        let result = productos.find( element => element.id === e.target.accessKey)
        result.cantidad--
        pintarModal()
    
    }
    
}


// Lo logica de este evento es pintar la informacion del carrito en el Modal ,Iteramos el objeto carrito
btnPedido.addEventListener("click", () => pintarModal() )
// Actualizamos el contador carrito
seguirComprando.addEventListener('click', () => cantidadCarrito() )     
//Generamos un Evento donde se ejecuta la funcion btnSumarRestar()
tableModal.addEventListener("click", (e) => btnSumarRestar(e))

// La logica de este evento es la confirmacion del pedido, donde guardamos el objeto carrito en el array pedidos
// Para luego almacenar la informacion en el localStorage
btnConfirmar.addEventListener("click", (e) => {
    e.preventDefault()
    let precioTotal = Object.values(productos).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    pedido.productos = {...productos}
    pedido.nombre = datosUser.nombre
    pedido.direccion = datosUser.direccion
    pedido.telefono = datosUser.telefono
    pedido.total = precioTotal
    pedidos.push(pedido)
    localStorage.setItem('pedidos', JSON.stringify(pedidos))
 window.location.href = "./pedido.html"
    productos = []
    pedido = {}
})

