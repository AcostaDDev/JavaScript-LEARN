//Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')

let articulosCarrito = [];


cargarEventListeners()
function cargarEventListeners() {
    //Cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)
    carrito.addEventListener('click', eliminarCurso)
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}

//Funciones
function agregarCurso(e) {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}


function eliminarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID)
        carritoHTML()
        
    }
}


function vaciarCarrito(e) {
    e.preventDefault()

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    articulosCarrito = [];
}


//SubFunciones
function leerDatosCurso(curso) {
    console.log(curso);

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++
            }
            return curso
        })
        articulosCarrito = [...cursos]

    } else articulosCarrito = [...articulosCarrito, infoCurso]

    carritoHTML()
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML()

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, id, cantidad } = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src=${imagen} alt="${curso.titulo}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;

        contenedorCarrito.appendChild(row);
    })

}

function limpiarHTML() {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

