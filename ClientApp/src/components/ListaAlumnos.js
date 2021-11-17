import Validaciones from "./Validaciones";
import "./General.css";
import axios from 'axios';
import { withRouter } from "react-router";
import React from "react";
import EditUserData from "./EditUserData";
import Login from "./Login";
import ModalDeleteUser from "../modals/ModalDeleteUser";
import withAuthAdmin from "./Auth/withAuthAdmin";


class ListaAlumnos extends React.Component {
    state = {
        idUsuario: 0,
        apellidoP: "",
        apellidoM: "",
        alumnos: [],
        showDeleteUser: false,
        showEditUser: false,
        showAddUser : false,
        problemasResueltos : 0,
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
        this.loadAlumnos();
    }

    mostrarAlerta = (nombre) => {
        alert("hola " + nombre);
    };

    abrirModal = () => {
        this.state.modalShow = true;
    };

    loadAlumnos = async () => {
        var valueToken = "Bearer " + sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: valueToken,
        };
        const respuesta = await axios.post(
            "/api/Envios/listaAlumnosEnvio",
            {},
            {
                headers: headers,
            }
        );
        this.setState({ alumnos: respuesta.data });
        console.log(respuesta.data);
        console.log("hola");
    };


    render() {
        const ListaAMostrar = this.state.alumnos.map((alumno) => {
            return (
                <tr>
                    <td>{alumno.usuario}</td>
                    <td>
                        {alumno.nombre}
                    </td>
                    <td>{alumno.problemasResueltos}</td>
                    <td>
                        
                        <button
                            className="btn btn-success"
                        >
                            Ver lista de problemas
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
                    <h1> Alumnos Existentes </h1>
                </div>
                <div
                    style={{
                        marginBottom: "1rem",
                    }}
                >
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Usuario</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Problemas Resueltos</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>{ListaAMostrar}</tbody>
                            </table>
                        </div>
                    </div>
                </div>

                
            </div>
        );
    }
}

export default  withAuthAdmin( ListaAlumnos );