
const login = document.getElementById('formulario')

login.addEventListener("submit", (e)  => {
    e.preventDefault()
    let datosUser = {}
    datosUser.nombre = login.nombre.value
    datosUser.direccion = login.direccion.value
    datosUser.telefono = login.telefono.value
    localStorage.setItem('datosUser', JSON.stringify(datosUser))

    window.location.href = "./index.html"
})