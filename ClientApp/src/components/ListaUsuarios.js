import Validaciones from "./Validaciones";
import "./General.css";
import axios from 'axios';
import { withRouter } from "react-router";
import React from "react";
import EditUserData from "./EditUserData";
import Login from "./Login";
import ModalDeleteUser from "../modals/ModalDeleteUser";
import withAuthAdmin from "./Auth/withAuthAdmin";


class ListaUsuarios extends React.Component {
    state = {
        idUsuario: 0,
        apellidoP: "",
        apellidoM: "",
        usuarios: [],
        showDeleteUser: false,
        showEditUser: false,
        showAddUser : false,

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
        errorNombreUsuario : ""
    };

    componentDidMount() {
        this.loadUsers();
    }

    mostrarAlerta = (nombre) => {
        alert("hola " + nombre);
    };

    abrirModal = () => {
        this.state.modalShow = true;
    };

    loadUsers = async () => {
        var valueToken = "Bearer " + sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: valueToken,
        };
        const respuesta = await axios.post(
            "/api/Usuario/obtenerUsuarios",
            {},
            {
                headers: headers,
            }
        );
        this.setState({ usuarios: respuesta.data });
        this.setState({ idUsuario: respuesta.data.idUsuario });
        console.log(respuesta.data);
    };

    addUser = async (usuario) => {
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
                tipo: "Admin",
                codigo: usuario.codigoRegistro,
            });
            this.handleCloseAddUser();
            this.loadUsers();
            return true;
        } catch (error) {
            this.setState({
                errorNombreUsuario: "El este nombre de usuario ya existe",
            });
            return false;
        }
        
    };

    deleteUser = async (id) => {
        var valueToken = "Bearer " + sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: valueToken,
        };
        const respuesta = await axios.post(
            "/api/Usuario/eliminarUsuario",
            {
                id: id,
            },
            {
                headers: headers,
            }
        );
        this.handleCloseDeleteUser();
        this.loadUsers();
    };

    editUser = async (usuario) => {
        var valueToken = "Bearer " + sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: valueToken,
        };

        console.log(usuario.id);
        await axios.post(
            "/api/Usuario/ModificarUsuario",
            {
                id: usuario.id,
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
            },
            {
                headers: headers,
            }
        );
        this.handleCloseEditUser();
        this.loadUsers();
    };

    handleCloseDeleteUser = () => this.setState({ showDeleteUser: false });
    handleOpenDeleteUser = (nombre, id) => {
        this.setState({
            showDeleteUser: true,
            nombre: nombre,
            idUsuario: id,
        });
    };

    handleCloseEditUser = () => {
        this.setState({ showEditUser: false });
    };
    handleOpenEditUser = (usuario) => {
        //console.log(usuario.id);
        this.setState({
            idUsuario : usuario.id,
            showEditUser: true,
            nombreUsuario: usuario.usuario,
            nombre: usuario.nombre,
            apellidoPaterno: usuario.apellidoP,
            apellidoMaterno: usuario.apellidoM,
            correo: usuario.correo,
            pais: usuario.pais,
            estado: usuario.estado,
            escuela: usuario.escuela,
            password: "",
            verifyPassword: "",
            codigoRegistro: "1234567890",
        });
    };

    handleCloseAddUser = () => {
        this.setState({ showAddUser: false });
    };
    handleOpenAddUser = () => {
        this.setState({
            showAddUser: true,
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
        });
    };

    render() {
        const ListaAMostrar = this.state.usuarios.map((usuario) => {
            return (
                <tr>
                    <td>{usuario.usuario}</td>
                    <td>
                        {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
                    </td>
                    <td>{usuario.tipo}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                this.handleOpenDeleteUser(
                                    usuario.nombre,
                                    usuario.id
                                )
                            }
                        >
                            Eliminar
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => this.handleOpenEditUser(usuario)}
                        >
                            Editar
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "20vh",
                    }}
                >
                    <h1> Usuarios Existentes </h1>
                </div>
                <div
                    style={{
                        marginBottom: "1rem",
                    }}
                >
                    <button
                        className="btn btn-primary"
                        onClick={() => this.handleOpenAddUser()}
                    >
                        Agregar Docente
                    </button>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Usuario</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>{ListaAMostrar}</tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <EditUserData
                    title="Agregar Usuario"
                    closeModal={this.handleCloseAddUser}
                    show={this.state.showAddUser}
                    msgButton="Agregar"
                    pressedButton={this.addUser}
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

                <EditUserData
                    title="Editar Usuario"
                    closeModal={this.handleCloseEditUser}
                    show={this.state.showEditUser}
                    msgButton="Actualizar"
                    pressedButton={this.editUser}
                    errorNombre=""
                    formularioInput={{
                        id: false,
                        nombreUsuario: true,
                        nombre: false,
                        apellidoPaterno: false,
                        apellidoMaterno: false,
                        correo: false,
                        pais: false,
                        estado: false,
                        escuela: false,
                        password: false,
                        verifyPassword: false,
                        codigoRegistro: true,
                    }}
                    formulario={{
                        id: this.state.idUsuario,
                        nombreUsuario: this.state.nombreUsuario,
                        nombre: this.state.nombre,
                        apellidoPaterno: this.state.apellidoPaterno,
                        apellidoMaterno: this.state.apellidoMaterno,
                        correo: this.state.correo,
                        pais: this.state.pais,
                        estado: this.state.estado,
                        escuela: this.state.escuela,
                        password: this.state.password,
                        verifyPassword: this.state.verifyPassword,
                        codigoRegistro: this.state.codigoRegistro,
                    }}
                />

                <ModalDeleteUser
                    show={this.state.showDeleteUser}
                    handleClose={this.handleCloseDeleteUser}
                    handleOpen={this.handleOpenDeleteUser}
                    nombre={this.state.nombre}
                    id={this.state.idUsuario}
                    deleteUser={this.deleteUser}
                    usuario={this.state.nombreUsuario}
                />
            </div>
        );
    }
}

export default  withAuthAdmin( ListaUsuarios );