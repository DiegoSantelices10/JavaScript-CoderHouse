const pedidos = JSON.parse(localStorage.getItem('pedidos'))
const pedidoRecibido = document.getElementById('recibido')

 pedidos.map( ({nombre, telefono, direccion, productos, total}) => 
 {
     pedidoRecibido.innerHTML = `
          <div class="card" style="width: 18rem;">
               <div class="card-body">
               <h5 class="card-title">Direccion: ${direccion}</h5>
                <p class="card-text">Cliente: ${nombre}</p>
                <p class="card-text">Telefono: ${telefono}</p>
                ${Object.values(productos).map(({nombre}) => `<p class="card-text m-0 p-0">Producto: ${nombre}</p>`).flat().join("")}
                <p class="card-text">Total: $${total}</p>
               </div>
          </div>`
}
 )



