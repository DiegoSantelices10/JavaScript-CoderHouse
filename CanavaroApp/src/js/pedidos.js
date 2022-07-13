const pedidos = JSON.parse(localStorage.getItem('pedidos'))
const pedidoRecibido = document.getElementById('recibido')

 pedidos.map( ({direccion, productos, total}) => 
 {
    const contenedor = document.createElement("div")
          contenedor.className = "d-flex"
          contenedor.innerHTML = `
          <div class="card" style="width: 18rem;">
               <div class="card-body">
                 <h5 class="card-title">Direccion: ${direccion}</h5>
                ${Object.values(productos).map(({nombre}) => `<p class="m-0 p-0">${nombre}</p>`)}
                 <p class="card-text">Total: $${total}</p>
               </div>
          </div>`

          pedidoRecibido.appendChild(contenedor)
}
 )



