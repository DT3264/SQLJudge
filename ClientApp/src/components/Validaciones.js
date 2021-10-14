class Validaciones {
    validarCorreo(correo) {
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(correo).toLowerCase()))
            return [false, "correo no valido"];
        if (correo.length === 0)
            return [false, "el correo no puede estar vacio"];
        return [true, ""];
    }

    validarNombre(nombre) {
        if (nombre.length === 0) {
            return [false, "nombre no puede estar vacio"];
        }
        if (nombre.length >= 45) {
            return [false, "el nombre solo puede tener hasta 45 letras"];
        }
        console.log("que?");
        return [true, ""];
    }

    validarNombreUsuario(nombre) {
        if (nombre.length === 0) {
            return [false, "usuario no puede estar vacio"];
        }
        if (nombre.length >= 45) {
            return [false, "el usuario solo puede tener hasta 45 letras"];
        }
        console.log("que?");
        return [true, ""];
    }

    validarPais(pais) {
        if (pais.length === 0) {
            return [false, "pais no puede estar vacio"];
        }
        if (pais.length >= 45) {
            return [false, "el pais solo puede tener hasta 45 letras"];
        }
        console.log("que?");
        return [true, ""];
    }

    validarEstado(estado) {
        if (estado.length === 0) {
            return [false, "estado no puede estar vacio"];
        }
        if (estado.length >= 45) {
            return [false, "el estado solo puede tener hasta 45 letras"];
        }
        console.log("que?");
        return [true, ""];
    }

    validarEscuela(escuela) {
        if (escuela.length === 0) {
            return [false, "escuela no puede estar vacio"];
        }
        if (escuela.length >= 45) {
            return [false, "la escuela solo puede tener hasta 45 letras"];
        }
        console.log("que?");
        return [true, ""];
    }

    validarPassword(password) {
        if (password.length === 0) {
            return [false, "password no puede estar vacio"];
        }
        if (password.length >= 45) {
            return [false, "la password solo puede tener hasta 150 caracteres"];
        }
        console.log("que?");
        return [true, ""];
    }

    validarVerifyPassword(password, verifyPassword) {
        if (password === verifyPassword) {
            return [true, ""];
        } else {
            return [false, "las contraseñas no coinciden"];
        }
    }
}

export default Validaciones;
