// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultado = document.querySelector('#resultado');


const maxYear = new Date().getFullYear();
const minYear = maxYear - 14;


const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}


document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
    
    // Llena las opciones de años
    llenarSelect();
})

// Eventos
marca.addEventListener('change', (e) => {datosBusqueda.marca = e.target.value; filtrarAuto();});
year.addEventListener('change', (e) => {datosBusqueda.year = parseInt(e.target.value); filtrarAuto();});
minimo.addEventListener('change', (e) => {datosBusqueda.minimo = e.target.value; filtrarAuto();});
maximo.addEventListener('change', (e) => {datosBusqueda.maximo = e.target.value; filtrarAuto();});
puertas.addEventListener('change', (e) => {datosBusqueda.puertas = e.target.value; filtrarAuto();});
transmision.addEventListener('change', (e) => {datosBusqueda.transmision = e.target.value; filtrarAuto();});
color.addEventListener('change', (e) => {datosBusqueda.color = e.target.value; filtrarAuto();});

// Funciones

function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach(auto => {
        const autoHTML = document.createElement('p');
        const { marca, modelo, year, puertas, transmision, color, precio } = auto
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `

        resultado.appendChild(autoHTML);
    })
}

function llenarSelect() {
    for(let i = maxYear; i >= minYear; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Filtros
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados que coincidan con tu búsqueda';
    resultado.appendChild(noResultado)
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda
    if(marca) {
        return auto.marca === marca
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda
    if(year){
        return auto.year === year
    }
    return auto;
}

function filtrarMinimo(auto){
    const { minimo } = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo
    }
    return auto;
}

function filtrarMaximo(auto){
    const { maximo } = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if(puertas) {
        return auto.puertas === parseInt(puertas)
    }
    return auto;
}

function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision
    }
    return auto;
}

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if(color) {
        return auto.color === color
    }
    return auto;
}