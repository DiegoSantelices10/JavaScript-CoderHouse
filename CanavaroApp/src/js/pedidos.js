const pedidos = JSON.parse(localStorage.getItem('pedidos'))
const pedidoRecibido = document.getElementById('recibido')
console.log(pedidos);


pedidos.map(({ nombre, telefono, direccion, productos, total }) => {
     pedidoRecibido.innerHTML = `
          <div class="p-0 mx-auto">
          <h3 style="font-weight: 900;" class="p-3">Confirma tu Pedido</h2>
          </div>
          <div class="card mx-auto p-1" style="width: 25rem;">
               <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                         <h5 style="font-weight: 700;" class="m-0">Cliente</h5>
                         <h5 class="m-0">${nombre}</h5>
                    </div>
                    <hr/>
                    <div class="d-flex justify-content-between">
                         <h5 style="font-weight: 700;" class="m-0">Direccion</h5>
                         <h5 class="m-0">${direccion}</h5>
                    </div>
                    <hr/>
                    <div class="d-flex justify-content-between">
                         <h5 style="font-weight: 700;" class="m-0">Telefono</h5>
                         <h5 class="m-0">${telefono}</h5>
                    </div>
                    <hr/>
                    <h5 style="font-weight: 700;">Productos</h5>

                ${Object.values(productos).map( ({ nombre, cantidad, categoria }) =>  
                              `<div class="d-flex justify-content-between">
                                   <h5 class="m-0" style="font-weight: 700;">${categoria}</h5>
                                   <h5 class="m-0">${nombre} <span>x ${cantidad}</span></h5>
                               </div>`).flat().join("") }
                                                                 <hr/>
                         <div class="d-flex justify-content-between">
                              <h5 style="font-weight: 700;">Total</h5>
                              <h5 style="font-weight: 700;" >$ ${total}</h5>
                         </div>
                         <button id="confirmarPedido" type="button" class="btn btn-primary"  data-bs-dismiss="modal">
                         Confimar Pedido
                       </button>
               </div>
          </div>`
}
)


document.getElementById('confirmarPedido').addEventListener('click', () => {
     Swal.fire({
          icon: 'success',
          title: 'Tu pedido ha sido confirmado',
          text: 'te avisaremos con este en camino!',
          showConfirmButton: true,
        }).then((result) =>{ if(result.isConfirmed) {

          localStorage.removeItem('pedidos', JSON.stringify(pedidos))
          localStorage.removeItem('datosUser')
          window.location.href = "./login.html"
        }} )

})

