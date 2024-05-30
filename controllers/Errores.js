document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const mensaje = urlParams.get('mensaje');
    if (mensaje) {
        switch (mensaje) {
            case 'errorU':
                var usuarioError = document.getElementById("usuario-error");
                usuarioError.textContent = 'Usuario no encontrado';
                usuarioError.style.display = 'block';
                break;
            case 'errorC':
                var contrasenaError = document.getElementById("contrasena-error");
                contrasenaError.textContent = 'Contraseña incorrecta';
                contrasenaError.style.display = 'block';
                break;
            case 'errorCorreo':
                var correoError = document.getElementById("correo-error");
                correoError.textContent = 'Correo no encontado, Intente de nuevo';
                correoError.style.display = 'block';
                break;
            case 'errorCodigo':
                var loginAlert = document.getElementById("login-alert");
                loginAlert.textContent = 'Codigo incorrecto, intenta de nuevo';
                loginAlert.style.display = 'block';
                break;
            case 'errorNoE':
                var loginAlert = document.getElementById("login-alert");
                loginAlert.textContent = 'Codigo no encontrado, intenta de nuevo';
                loginAlert.style.display = 'block';
                break;
            case 'Usados':
                var loginAlert = document.getElementById("login-alert");
                loginAlert.textContent = 'Usuario y correo existentes, intenta de nuevo';
                loginAlert.style.display = 'block';
                break;
            case 'Ecorreo':
                var loginAlert = document.getElementById("email-error");
                loginAlert.textContent = 'Correo usado, intenta de nuevo';
                loginAlert.style.display = 'block';
                break;
            case 'Eusuario':
                var loginAlert = document.getElementById("usuario-error");
                loginAlert.textContent = 'Usuario usado, intenta de nuevo';
                loginAlert.style.display = 'block';
                break;
            case 'contraseñaInvalida':
                var loginAlert = document.getElementById("contraseña-error");
                loginAlert.textContent = 'Contraseña invalida, intenta de nuevo';
                loginAlert.style.display = 'block';
                break;
            default:
                var loginAlert = document.getElementById("login-alert");
                loginAlert.textContent = 'Algo salió mal, intenta de nuevo';
                loginAlert.style.display = 'block';
                break;
        }
    }
});
