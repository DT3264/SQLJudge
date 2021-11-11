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
        return [true, ""];
    }

    validarNombreUsuario(nombre) {
        if (nombre.length === 0) {
            return [false, "usuario no puede estar vacio"];
        }
        if (nombre.length >= 45) {
            return [false, "el usuario solo puede tener hasta 45 letras"];
        }
        return [true, ""];
    }

    validarApellido(apellido) {
        if (apellido.length === 0) {
            return [false, "apellido no puede estar vacio"];
        }
        if (apellido.length >= 45) {
            return [false, "el apellido solo puede tener hasta 45 letras"];
        }
        return [true, ""];
    }

    validarNombreUsuario(nombre) {
        if (nombre.length === 0) {
            return [false, "usuario no puede estar vacio"];
        }
        if (nombre.length >= 45) {
            return [false, "el usuario solo puede tener hasta 45 letras"];
        }
        return [true, ""];
    }

    validarPais(pais) {
        if (pais.length === 0) {
            return [false, "pais no puede estar vacio"];
        }
        if (pais.length >= 45) {
            return [false, "el pais solo puede tener hasta 45 letras"];
        }
        return [true, ""];
    }

    validarEstado(estado) {
        if (estado.length === 0) {
            return [false, "estado no puede estar vacio"];
        }
        if (estado.length >= 45) {
            return [false, "el estado solo puede tener hasta 45 letras"];
        }
        return [true, ""];
    }

    validarEscuela(escuela) {
        if (escuela.length === 0) {
            return [false, "escuela no puede estar vacio"];
        }
        if (escuela.length >= 45) {
            return [false, "la escuela solo puede tener hasta 45 letras"];
        }
        return [true, ""];
    }

    validarPassword(password) {
        if (password.length === 0) {
            return [false, "password no puede estar vacio"];
        }
        if (password.length >= 45) {
            return [false, "la password solo puede tener hasta 150 caracteres"];
        }
        return [true, ""];
    }

    validarVerifyPassword(password, verifyPassword) {
        if (password === verifyPassword) {
            return [true, ""];
        } else {
            return [false, "las contraseñas no coinciden"];
        }
    }

    validarCodigoRegistro(codigo) {
        if (codigo.length !== 10) {
            return [false, "el codigo debe tener 10 caracteres"];
        }
        return [true, ""];
    }

    validarTituloProblema(titulo) {
        if (titulo.length === 0) {
            return [false, "el titulo no puede estar vacio"];
        }
        if (titulo.length >= 45) {
            return [false, "el titulo puede tener hasta 45 caracteres"];
        }
        return [true, ""];
    }
    validarDescripcion(descripcion) {
        if (descripcion.length === 0) {
            return [false, "la descripcion no puede estar vacia"];
        }
        return [true, ""];
    }
    validarSolucion(solucion) {
        if (solucion.length === 0) {
            return [false, "la solucion no puede estar vacia"];
        }
        return [true, ""];
    }
    validarDificultad(dificultad) {
        if (dificultad < 500 || dificultad > 3000) {
            return [false, "La dificultad va de 500 a 3000"];
        }
        return [true, ""];
    }
}

export default Validaciones;
