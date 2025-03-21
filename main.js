let cantidad = document.getElementById('cantidad');
let boton = document.getElementById('generar');
let botonCopiar = document.getElementById('copiar');
let botonLimpiar = document.getElementById('limpiar');
let contraseñaOutput = document.getElementById('contraseña');

const CadenaCaracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
const etiqueta = document.getElementById('etiquetaEvaluacion');

setTimeout(() => {
    mostrarAlerta(`¡Bienvenido al generador de contraseñas!
Por favor, llene el campo resaltado para empezar.`);
    cantidad.focus();
}, 100);

function mostrarAlerta(texto) {
    alert(texto);
    return;
}


function generar() {
    let numeroDigitado = parseInt(cantidad.value);
    if(numeroDigitado < 8) {
        mostrarAlerta('La cantidad de caracteres debe ser mayor o igual a 8');
        cantidad.value = '';
        cantidad.focus();
    } else if(cantidad.value === '') {
        mostrarAlerta('Por favor, llene el campo resaltado primero.');
        cantidad.focus();
    }
        let password = '';
        for(let i = 0; i < numeroDigitado; i++) {
            let caracterAleatorio = Math.floor(Math.random() * CadenaCaracteres.length);
            password += CadenaCaracteres.charAt(caracterAleatorio); 
        } 
        contraseñaOutput.value = password;
    
    evaluarContraseña(password);
}

function evaluarContraseña(password) {
    console.log(`Evaluando: ${password}`);
    console.log(`Longitud: ${password.length}`);

    const esFuerte = password.length >= 8 &&
                     tieneMayus(password) &&
                     tieneMinus(password) &&
                     tieneDigitos(password) &&
                     tieneSimbolos(password);
    
    if(esFuerte) {
        etiqueta.textContent = 'Contraseña fuerte';
        etiqueta.style.color = 'green';
    } else {
        etiqueta.textContent = 'Contraseña débil';
        etiqueta.style.color = 'red';
    }
}

function copiar() {
    if(contraseñaOutput.value === '') {
        mostrarAlerta('Por favor, llene el campo resaltado primero.');
        cantidad.focus();
    } else {
        navigator.clipboard.writeText(contraseñaOutput.value).then(() => {
            mostrarAlerta(`Tu contraseña: ${contraseñaOutput.value}, ha sido copiada al portapapeles.`);
        })
        .catch(() => {
            mostrarAlerta(`No ha sido posible copiar ${contraseñaOutput.value}`)
        })
    }
}

function limpiar() {
    if(contraseñaOutput.value === '') {
        mostrarAlerta('Por favor, llene el campo resaltado primero.');
        cantidad.focus();
    } else {
        contraseñaOutput.value = '';
        cantidad.value = '';
        etiqueta.textContent = '';
    }
}

function tieneMayus(password) {
    return /[A-Z]/.test(password);
}

function tieneMinus(password) {
    return /[a-z]/.test(password);
}

function tieneDigitos(password) {
    return /[0-9]/.test(password);
}

function tieneSimbolos(password) {
    return /[/!@#$%^&*()]/.test(password);
}

boton.addEventListener('click', generar);
botonCopiar.addEventListener('click', copiar);
botonLimpiar.addEventListener('click', limpiar);