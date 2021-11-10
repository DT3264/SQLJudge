import React from "react";
import ModalCodigoFuente from "../modals/ModalCodigoFuente";
import withAuthAdmin from "./Auth/withAuthAdmin";
import CardAlumnoProblemas from "./CardAlumnoProblemas";
import Editor from "../components/Editor";

class DetalleProblemasAlumno extends React.Component {
    state = {
        nombreAlumno: "Luis Andres Gutierrez Calderon",
        usuario: "AndrosGreen",
        envios: 40,
        aceptados: 33,
        incorrectos: 20,
        error: 15,
        problemasResueltos: [
            {
                id: 2,
                nombre: "Ciudades de Mexico",
                fechaHoraEnvio: "10/11/2021 18:07:45",
                codigoFuente: "SELECT * FROM CITY;",
            },
            {
                id: 34,
                nombre: "Ordenes de Amazon",
                fechaHoraEnvio: "05/12/2021 20:07:45",
                codigoFuente: "SELECT * FROM Amazon;",
            },
            {
                id: 1,
                nombre: "Municipios de Yuriria",
                fechaHoraEnvio: "04/08/2019 18:07:45",
                codigoFuente: "SELECT * FROM country;",
            },
        ],
        modalShow: false,
        sql: "select * from datos",
        nombreProblema: "",
        idProblema: 0,
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

export default withAuthAdmin(DetalleProblemasAlumno);
