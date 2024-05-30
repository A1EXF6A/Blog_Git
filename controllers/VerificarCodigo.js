class VerificadorCodigo {
    constructor() {
        this.caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.generarNuevoCodigo();
    }

    generarNuevoCodigo() {
        this.codigo = '';
        for (let i = 0; i < 6; i++) {
            this.codigo += this.caracteres.charAt(Math.floor(Math.random() * this.caracteres.length));
        }
        document.getElementById('codigo').textContent = this.codigo;
    }

    verificarCodigo(codigoIngresado) {
        return this.codigo === codigoIngresado;
    }

    obtenerCodigo() {
        return this.codigo;
    }

}


