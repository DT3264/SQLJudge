import React from "react";
import { withRouter } from "react-router";
import "./General.css";
import "./Validaciones.js";
import Validaciones from "./Validaciones.js";
import axios from "axios";

class Registro extends React.Component {
    estadoTest = {
        nombreUsuario: "",
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        correo: "",
        pais: "",
        estado: "",
        escuela: "",
        password: "",
        verifyPassword: "",
        codigoRegistro: "",
    };

    state = {
        formulario: this.estadoTest,
        formularioErrores: this.estadoTest,
    };

    componentDidMount() {
        document.title = "SQL Judge - Registro";
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            formulario: {
                ...this.state.formulario,
                [name]: value,
            },
        });
    };

    RequestRegisterUser = async () => {
        try {
            await axios.post("/api/Registro", {
                nombre: this.state.formulario.nombre,
                apellidoP: this.state.formulario.apellidoPaterno,
                apellidoM: this.state.formulario.apellidoMaterno,
                correo: this.state.formulario.correo,
                usuario: this.state.formulario.nombreUsuario,
                clave: this.state.formulario.password,
                pais: this.state.formulario.pais,
                estado: this.state.formulario.estado,
                escuela: this.state.formulario.escuela,
                tipo: "Alumno",
                codigo: this.state.formulario.codigoRegistro,
            });
            this.props.history.push("/login");
        } catch (error) {
            this.setState({
                formularioErrores: {
                    ...this.state.formularioErrores,
                    nombreUsuario: "El este nombre de usuario ya existe",
                },
            });
        }
    };

    RegisterUser = async () => {
        var esPosible = true;
        var validaciones = new Validaciones();

        var testCorreo = validaciones.validarCorreo(
            this.state.formulario.correo
        );
        var testNombre = validaciones.validarNombre(
            this.state.formulario.nombre
        );
        var testNombreUsuario = validaciones.validarNombreUsuario(
            this.state.formulario.nombreUsuario
        );
        var testPais = validaciones.validarPais(this.state.formulario.pais);
        var testEstado = validaciones.validarEstado(
            this.state.formulario.estado
        );
        var testEscuela = validaciones.validarEscuela(
            this.state.formulario.escuela
        );
        var testPassword = validaciones.validarPassword(
            this.state.formulario.password
        );
        var testVerify = validaciones.validarVerifyPassword(
            this.state.formulario.password,
            this.state.formulario.verifyPassword
        );
        var testApellidoPaterno = validaciones.validarApellido(
            this.state.formulario.apellidoPaterno
        );
        var testApellidoMaterno = validaciones.validarApellido(
            this.state.formulario.apellidoPaterno
        );
        var testCodigoVerificacion = validaciones.validarCodigoRegistro(
            this.state.formulario.codigoRegistro
        );

        if (!testCorreo[0]) esPosible = false;
        if (!testNombre[0]) esPosible = false;
        if (!testNombreUsuario[0]) esPosible = false;
        if (!testPais[0]) esPosible = false;
        if (!testEstado[0]) esPosible = false;
        if (!testEscuela[0]) esPosible = false;
        if (!testVerify[0]) esPosible = false;
        if (!testApellidoPaterno[0]) esPosible = false;
        if (!testApellidoMaterno[0]) esPosible = false;

        this.setState({
            formularioErrores: {
                ...this.state.formularioErrores,
                correo: testCorreo[1],
                nombre: testNombre[1],
                nombreUsuario: testNombreUsuario[1],
                pais: testPais[1],
                estado: testEstado[1],
                escuela: testEscuela[1],
                password: testPassword[1],
                verifyPassword: testVerify[1],
                apellidoPaterno: testApellidoPaterno[1],
                apellidoMaterno: testApellidoMaterno[1],
                codigoRegistro: testCodigoVerificacion[1],
            },
        });

        if (esPosible) {
            this.RequestRegisterUser();
        }
    };

    render() {
        return (
            <div className="container container-body">
                <form onSubmit={(event) => event.preventDefault()}>
                    <div className="form-group">
                        <label>Nombre de Usuario:</label>
                        <input
                            name="nombreUsuario"
                            onChange={this.handleInputChange}
                            value={this.state.formulario.nombreUsuario}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.nombreUsuario}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Nombre(s):</label>
                        <input
                            name="nombre"
                            onChange={this.handleInputChange}
                            value={this.state.formulario.nombre}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.nombre}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Apellido Paterno:</label>
                        <input
                            name="apellidoPaterno"
                            onChange={this.handleInputChange}
                            value={this.state.formulario.apellidoPaterno}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.apellidoPaterno}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Apellido Materno:</label>
                        <input
                            name="apellidoMaterno"
                            onChange={this.handleInputChange}
                            value={this.state.formulario.apellidoMaterno}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.apellidoMaterno}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Correo:</label>
                        <input
                            name="correo"
                            onChange={this.handleInputChange}
                            value={this.state.formulario.correo}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.correo}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Pais:</label>
                        <input
                            name="pais"
                            onChange={this.handleInputChange}
                            value={this.state.pais}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.pais}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Estado:</label>
                        <input
                            name="estado"
                            onChange={this.handleInputChange}
                            value={this.state.estado}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.estado}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Escuela:</label>
                        <input
                            name="escuela"
                            onChange={this.handleInputChange}
                            value={this.state.escuela}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.escuela}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Codigo de registro:</label>
                        <input
                            name="codigoRegistro"
                            onChange={this.handleInputChange}
                            value={this.state.formulario.codigoRegistro}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.codigoRegistro}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            name="password"
                            type="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.password}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Verificar Contraseña:</label>
                        <input
                            name="verifyPassword"
                            type="password"
                            onChange={this.handleInputChange}
                            value={this.state.verifyPassword}
                            className="form-control"
                        />
                        <p className="error-validacion">
                            {this.state.formularioErrores.verifyPassword}
                        </p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={this.RegisterUser}
                    >
                        Registrarme
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(Registro);