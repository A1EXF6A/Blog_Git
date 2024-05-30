class ValidacionesEntrada {
    static validarNombre(nombre) {
        var regex = /^[a-zA-Z\s]+$/;
        return regex.test(nombre);
    }

    static validarNombreUsuario(nombreUsuario) {
        var regex = /^[a-zA-Z0-9_]+$/;
        return regex.test(nombreUsuario);
    }

    static validarContraseña(contraseña) {
        if (contraseña.length < 8) {
            return false;
        }
        var regex = /^[a-zA-Z0-9_]+$/;
        return regex.test(contraseña);
    }

    static validarCorreoElectronico(correoElectronico) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correoElectronico);
    }

    static validarIntereses() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        var interesesError = document.getElementById("intereses-error");

        if (checkboxes.length === 0) {
            interesesError.innerText = "Por favor, selecciona al menos un interés.";
            return false;
        } else {
            interesesError.innerText = "";
        }
        return true;
    }

    static Login() {
        var usuario = document.getElementById("usuario").value;
        var contrasena = document.getElementById("contrasena").value;
        var usuarioError = document.getElementById("usuario-error");
        var contrasenaError = document.getElementById("contrasena-error");
        var isValid = true;

        if (!this.validarNombreUsuario(usuario)) {
            usuarioError.innerText = "Por favor, ingrese su usuario";
            isValid = false;
        } else {
            usuarioError.innerText = "";
        }

        if (!this.validarContraseña(contrasena)) {
            contrasenaError.innerText = "Por favor, ingrese su contraseña";
            isValid = false;
        } else {
            contrasenaError.innerText = "";
        }

        return isValid;
    }

    static invitado() {
        var invitado = document.getElementById("invitado").value;
        var invitadoError = document.getElementById("invitado-error");
        var isValid = true;
        if (!this.validarNombreUsuario(invitado)) {
            invitadoError.innerText = "Por favor, ingrese un nombre de usuario valido";
            isValid = false;
        } else {
            invitadoError.innerText = "";
        }
        return isValid;
    }

    static registro() {
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var usuario = document.getElementById("usuario").value;
        var contraseña = document.getElementById("contraseña").value;
        var isValid = true;
        var nombreError = document.getElementById("nombrecompleto-error");
        var correoError = document.getElementById("email-error");
        var usuarioError = document.getElementById("usuario-error");
        var contraseñaError = document.getElementById("password-error");
        var interesesError = document.getElementById("intereses-error");

        if (!this.validarNombre(nombre)) {
            nombreError.innerText = "Por favor, ingrese un nombre valido";
            isValid = false;
        } else {
            nombreError.innerText = ""
        }
        if (!this.validarCorreoElectronico(correo)) {
            correoError.innerText = "Por favor, ingrese un correo valido";
            isValid = false;
        } else {
            correoError.innerText = ""
        }
        if (!this.validarNombreUsuario(usuario)) {
            usuarioError.innerText = "Por favor, ingrese un nombre de usuario valido";
            isValid = false;
        } else {
            usuarioError.innerText = ""
        }
        if (!this.validarContraseña(contraseña)) {
            contraseñaError.innerText = "Por favor, ingrese una contraseña valida";
            isValid = false;
        } else {
            contraseñaError.innerText = ""
        }
        if (!this.validarIntereses()) {
            isValid = false;
        } else {
            interesesError.innerText = "";
        }
        return isValid;
    }

    static correo() {
        var correo = document.getElementById("correo").value;
        var correoError = document.getElementById("correo-error");
        var isValid = true;
        if (!this.validarCorreoElectronico(correo)) {
            correoError.innerText = "Por favor, ingrese un correo valido";
            isValid = false;
        } else {
            correoError.innerText = ""
        }
        return isValid;
    }

    static codigo() {
        var codigo = document.getElementById("codigo").value;
        var codigoError = document.getElementById("codigo-error");
        var isValid = true;
        if (codigo === "") {
            codigoError.innerText = "Codigo incorrecto";
            isValid = false;
        } else {
            codigoError.innerText = ""
        }
        return isValid;
    }

    static contraseña() {
        var contraseña = document.getElementById("contraseña").value;
        var contraseñaError = document.getElementById("contrasena-error");
        var isValid = true;
        if (!this.validarContraseña(contraseña)) {
            contraseñaError.innerText = "Por favor, Ingrese una contraseña valida";
            isValid = false;
        } else {
            contraseñaError.innerText = ""
        }
        return isValid;
    }
}
