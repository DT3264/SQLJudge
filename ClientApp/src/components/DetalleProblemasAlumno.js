import React from "react";
import ModalCodigoFuente from "../modals/ModalCodigoFuente";
import withAuthAdmin from "./Auth/withAuthAdmin";
import CardAlumnoProblemas from "./CardAlumnoProblemas";
import axios from "axios";
import { withRouter } from "react-router";

class DetalleProblemasAlumno extends React.Component {
    state = {
        nombreAlumno: "",
        usuario: "",
        envios: 0,
        aceptados: 0,
        incorrectos: 0,
        error: 0,
        problemasResueltos: [],
        modalShow: false,
        sql: "select * from datos",
        nombreProblema: "",
        idProblema: 0,
    };

    componentDidMount() {
        this.obtenerDatos();
    }

    obtenerDatos = async () => {
        var id = this.props.match.params.id;
        var valueToken = "Bearer " + sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: valueToken,
        };
        const respuesta = await axios.post(
            "/api/Envios/detalleProblemasAlumno",
            {
                id: id,
            },
            {
                headers: headers,
            }
        );

        var datos = respuesta.data;
        this.setState({
            nombreAlumno: datos.nombreAlumno,
            usuario: datos.usuario,
            envios: datos.envios,
            aceptados: datos.aceptados,
            incorrectos: datos.incorrectos,
            error: datos.error,
            problemasResueltos: datos.problemasResueltos,
        });
    };

    handleOpenModal = (nombre, id, sql) => {
        this.setState({
            modalShow: true,
            nombreProblema: nombre,
            idProblema: id,
            sql: sql,
        });
    };
    handleCloseModal = () => {
        this.setState({ modalShow: false });
    };

    setSQL = (value) => {
        this.setState({ sql: value });
    };

    render() {
        const filasTabla = this.state.problemasResueltos.map((problema) => {
            return (
                <tr>
                    <td scope="row">{problema.id}</td>
                    <td>{problema.nombre}</td>
                    <td>{problema.fechaHoraEnvio}</td>
                    <td>
                        <button
                            className="btn btn-success"
                            onClick={() =>
                                this.handleOpenModal(
                                    problema.nombre,
                                    problema.id,
                                    problema.codigoFuente
                                )
                            }
                        >
                            Ver Envio
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <CardAlumnoProblemas
                    nombre={this.state.nombreAlumno}
                    usuario={this.state.usuario}
                    envios={this.state.envios}
                    aceptados={this.state.aceptados}
                    incorrectos={this.state.incorrectos}
                    error={this.state.error}
                />

                <table
                    className="table header-tabla"
                    style={{ marginTop: "4rem" }}
                >
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Problmea</th>
                            <th scope="col">Fecha Envio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>{filasTabla}</tbody>
                </table>
                <ModalCodigoFuente
                    show={this.state.modalShow}
                    handleClose={this.handleCloseModal}
                    problema={this.state.nombreProblema}
                    id={this.state.idProblema}
                    sql={this.state.sql}
                />
            </div>
        );
    }
}

export default withAuthAdmin(withRouter(DetalleProblemasAlumno));
