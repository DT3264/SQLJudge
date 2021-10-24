import React from "react";
import "./General.css";
import "./Validaciones.js";
import axios from "axios";
import EditUserData from "./EditUserData";
import { withRouter } from "react-router";

class Registro extends React.Component {
    state = {
        errorNombreUsuario: "",
        modalShow: false,
    };

    componentDidMount() {
        document.title = "SQL Judge - Registro";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.modalShow !== this.props.modalShow) {
            this.setState({
                modalShow: this.props.modalShow,
            });
        }
    }

    RequestRegisterUser = async (usuario) => {
        try {
            await axios.post("/api/Registro", {
                nombre: usuario.nombre,
                apellidoP: usuario.apellidoPaterno,
                apellidoM: usuario.apellidoMaterno,
                correo: usuario.correo,
                usuario: usuario.nombreUsuario,
                clave: usuario.password,
                pais: usuario.pais,
                estado: usuario.estado,
                escuela: usuario.escuela,
                tipo: "Alumno",
                codigo: usuario.codigoRegistro,
            });
            this.props.cerrarModal();
            this.props.history.push("/login");
            return true;
        } catch (error) {
            this.setState({
                errorNombreUsuario: "El este nombre de usuario ya existe",
            });
            return false;
        }
    };

    abrirModal = () => {
        this.props.abrirModal();
    };

    toggle = () => {
        this.props.cerrarModal();
    };

    render() {
        return (
            <div className="container container-body">
                <EditUserData
                    title="Registro"
                    closeModal={this.toggle}
                    show={this.state.modalShow}
                    msgButton="Registrarme"
                    pressedButton={this.RequestRegisterUser}
                    errorNombre={this.state.errorNombreUsuario}
                    formularioInput={{
                        id: false,
                        nombreUsuario: false,
                        nombre: false,
                        apellidoPaterno: false,
                        apellidoMaterno: false,
                        correo: false,
                        pais: false,
                        estado: false,
                        escuela: false,
                        password: false,
                        verifyPassword: false,
                        codigoRegistro: false,
                    }}
                    formulario={{
                        id: "",
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
                    }}
                />
            </div>
        );
    }
}

export default withRouter(Registro);
