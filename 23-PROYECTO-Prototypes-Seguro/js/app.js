//Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function() {
    /*
    1 = Americano 1.15
    2 = Asiático 1.05
    3 = Europeo 1.35
    */

    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //leer año
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3) * cantidad / 100)

    /*
    si el seguro es basico se multiplica por un 30%
    si el seguro es completo se multiplica por un 50%
    */

    if (this.tipo === 'basico') cantidad *= 1.30;
    else cantidad *= 1.50;

    return cantidad;
}

function UI() {}

//Llena las opciones de los años

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 24;
    
    const selectYear = document.querySelector('#year');

    for(let i = max; i >= min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        selectYear.appendChild(option);
    }

}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('DIV');

    if(tipo === 'error') div.classList.add('error')
    else div.classList.add('correcto')

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout( () => {
        div.remove()
    }, 3000)

}

UI.prototype.mostrarResultado = (seguro, total) => {
    const { marca, year, tipo } = seguro;
    let textoMarca;
    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break
    }

    const div = document.createElement('DIV');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header"> Tu Resumen: </p>
        <p class="font-bold">Marca: <span class="font-nomal"> ${textoMarca} </span></p>
        <p class="font-bold">Año: <span class="font-nomal"> ${year} </span></p>
        <p class="font-bold">Tipo: <span class="font-nomal capitalize"> ${tipo} </span></p>
        <hr class="my-5">
        <p class="font-bold">Total: <span class="font-nomal">$${total}</span></p>
    `;
    
    const resultadoDiv = document.querySelector('#resultado');
    //Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout( () => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000)
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //Llena el select con los años
})

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    
    const marca = document.querySelector('#marca').value
    const year = document.querySelector('#year').value    
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if(marca === '' || year === '' || tipo === '') return ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
    
    ui.mostrarMensaje('Cotizando...', 'exito');

    //Ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados) resultados.remove();

    // Instanciar Seguro
    const seguro = new Seguro(marca, year, tipo)
    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(seguro, total)

}
