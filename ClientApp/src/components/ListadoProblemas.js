import React from "react";
import axios from "axios";
import ModalEliminar from "../modals/ModalEliminar";
import withAuthAdmin from "./Auth/withAuthAdmin";
import { withRouter } from "react-router";

class ListadoProblemas extends React.Component {
    state = { problemas: [], modalEliminar: false, idProblema: 0, nombre: "" };

    componentDidMount() {
        this.cargarProblemas();
    }

    handleOpenEliminar = (idProblema, nombre) => {
        this.setState({
            modalEliminar: true,
            nombre: nombre,
            idProblema: idProblema,
        });
    };
    handleCloseEliminar = () => this.setState({ modalEliminar: false });

    cargarProblemas = async () => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "api/Problemas/obtenerProblemasCompletos",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );
        console.log(respuesta.data);
        this.setState({ problemas: respuesta.data });
    };

    deleteProblem = async (id) => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "/api/problemas/eliminarProblema",
            {
                idProblema: id,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );
        console.log(respuesta);
        this.handleCloseEliminar();
        this.cargarProblemas();
    };

    render() {
        const filasProblemas = this.state.problemas.map((problema) => {
            console.log(problema);
            return (
                <tr>
                    <th>{problema.id}</th>
                    <td>{problema.nombre}</td>
                    <td>{problema.categoria.idCategoria}</td>
                    <td>{problema.dificultad}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                this.handleOpenEliminar(
                                    problema.idProblema,
                                    problema.nombre
                                )
                            }
                        >
                            Eliminar
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() =>
                                this.props.history.push(
                                    "/actualizar-problema",
                                    {
                                        problema1: {
                                            idProblema: problema.id,
                                            nombre: problema.nombre,
                                            descripcion: problema.descripcion,
                                            solucion: problema.solucion,
                                            idBaseDeDatos:
                                                problema.baseDatos.idBase,
                                            idCategoria:
                                                problema.categoria.idCategoria,
                                            dificultad: problema.dificultad,
                                        },
                                    }
                                )
                            }
                        >
                            Editar
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Dificultad</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>{filasProblemas}</tbody>
                </table>
                <ModalEliminar
                    titulo="Problema"
                    handleClose={this.handleCloseEliminar}
                    show={this.state.modalEliminar}
                    nombre={this.state.nombre}
                    delete={this.deleteProblem}
                    id={this.state.idProblema}
                />
            </div>
        );
    }
}
export default withAuthAdmin(withRouter(ListadoProblemas));
