document.addEventListener('DOMContentLoaded', () => {

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    //Seleccionar los elementos de la interfaz
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner')

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');

    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    // Asignar eventos
    formulario.addEventListener('submit', enviarEmail);

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    btnReset.addEventListener('click', (e) =>{
        e.preventDefault();
        resetFormulario();
    })

    function validar(e) {

        const id = e.target.id;
        const div = e.target.parentElement;

        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${id} es obligatorio`, div);
            email[id] = '';
            comprobarEmail()
            return;
        } 
        
        if(id === 'email' && !validarEmail(e.target.value.trim())) {
            mostrarAlerta('Email no valido', div);
            email[id] = '';
            comprobarEmail()
            return;
        }

        

        //Asignar los valores
        email[id] = e.target.value.trim().toLowerCase();
        limpiarAlerta(div);
        comprobarEmail()

    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);    

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'mt-5', 'text-center');

        referencia.appendChild(error);

    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600')
        alerta ? alerta.remove() : null;    
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function enviarEmail(e) {
        e.preventDefault();
        
        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout( () => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            resetFormulario()

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Email enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout( () => alertaExito.remove(), 3000)

        }, 3000);
    }

    function resetFormulario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }

})