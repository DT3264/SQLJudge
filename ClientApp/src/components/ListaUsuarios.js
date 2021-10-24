import Validaciones from "./Validaciones";
import "./General.css";
import axios from 'axios';
import { withRouter } from "react-router";
import React from "react";
import EditUserData from "./EditUserData";
import Login from "./Login";


class ListaUsuarios extends React.Component{

    state = {
        idUsuario : 0,
        nombre : '',
        apellidoP : '',
        apellidoM : '',
        usuarios : [],
        modalShow : false
    }

    componentDidMount (){
        this.loadUsers();
    }

    mostrarAlerta = (nombre) => {
        
        alert("hola " + nombre);
    };
    
    abrirModal = () => {
        this.state.modalShow = true
    };

    loadUsers = async () => {
        var valueToken = "Bearer " + sessionStorage.getItem('token');
        const headers = {
            "Content-Type": "application/json",
            Authorization: valueToken
        };
        const respuesta = await axios.post( '/api/Usuario/obtenerUsuarios',{},{
                headers : headers
            }
        );
        this.setState({usuarios : respuesta.data});
        this.setState({idUsuario : respuesta.data.idUsuario});
        console.log(respuesta.data);
    }

    deleteUser = async (id) => {
        var valueToken = "Bearer " + sessionStorage.getItem('token');
        const headers = {
            "Content-Type": "application/json",
            Authorization: valueToken
        };
        const respuesta = await axios.post('/api/Usuario/eliminarUsuario',{
                id : id
            },{
                headers : headers
            }
        );
        this.loadUsers();
    }

    handleCloseDeleteUser = () => this.setState({showDeleteStudent : false});
    handleOpenDeleteUser = ( noControl ) => { 
        this.setState({
            showDeleteStudent : true,
            noControl : noControl
        }); 
    }

    render(){
        const ListaAMostrar = this.state.usuarios.map((usuario) => {
            return (
                <tr>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.edad}</td>
                    <td>hola</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.deleteUser(usuario.id)}
                        >
                            Eliminar
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => this.abrirModal}
                        >
                            Editar
                        </button>
                    </td>
                </tr>
            );
        });
        
        return (
            <div>
                
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
                    <h1> Usuarios Existentes </h1>
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
                            <tbody>
                                {ListaAMostrar}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>

                <EditUserData
                    title="Registro"
                    closeModal={this.toggle}
                    show={this.state.modalShow}
                    msgButton="Registrarme"
                    pressedButton={this.RequestRegisterUser}
                    errorNombre={this.state.errorNombreUsuario}
                    formularioInput={{
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

                <button>agregar usuario</button>
            </div>
        );
    }
}

export default ListaUsuarios;