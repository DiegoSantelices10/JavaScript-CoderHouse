let pedidos = [];
let carrito = {}
const cardPizza = document.getElementById("pizzas");
const carritoAdd = document.querySelector("table")

let pizzas = [
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

pizzas.map((pizza) => {
    const contenedor = document.createElement("div");
    contenedor.className = "shadow-sm p-2 mb-3 bg-white rounded d-flex justify-content-between align-items-center contenido"
    contenedor.innerHTML = `
                                <img
                                    key="${pizza.id}"
                                    src="${pizza.imagen}"
                                    class="img-pizza"
                                    alt="${pizza.nombre}"
                                />
                                <div class="p-2  w-100">
                                    <h5 class="m-0">${pizza.nombre}</h4>
                                    <h6 class="m-0 ">${pizza.descripcion}</h6>
                                    <p class="m-0 fw-bold">${pizza.precio}</p>
                                </div>
                            <div>
                            <a name="agregar" id="${pizza.id}"  class="btn btn-outline-light text-primary p-3 shadow-sm fw-bold rounded-pill" href="#" role="button">Agregar</a>
                            </div> `;
             cardPizza.appendChild(contenedor);
             document.getElementById(`${pizza.id}`).addEventListener("click", () => {addCarrito(contenedor)} )
})


const addCarrito = items => {
    if(items) setCarrito(items)
}

const setCarrito = item => {
    const producto = {
        nombre: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('a').id,
        cantidad: 1
    }
    //console.log(producto);
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
     carrito[producto.id] = {...producto}

        pintarCarrito()
    }

    const pintarCarrito = () => {
        carritoAdd.innerHTML = ""
        Object.values(carrito).map(producto => {
            const contenedor = document.createElement("tbody");
            contenedor.innerHTML = `<tr>
                                        <th scope="row">${producto.id}</th>
                                        <td>${producto.nombre}</td>
                                        <td>${producto.cantidad}</td>
                                        <td>
                                        <button name="muzamin"  class="mx-1 shadow-sm fw-bold text-danger rounded px-1 border-0 bg-white" type="button" >-</button>
                                        <button name="muzamax"  class="shadow-sm text-primary fw-bold rounded px-1 border-0 bg-white" type="button" >+</button>
                                        </td>
                                        <td>$ ${producto.precio * producto.cantidad}</td>
                                    </tr>
                                     `
            carritoAdd.appendChild(contenedor)
        })
    }

