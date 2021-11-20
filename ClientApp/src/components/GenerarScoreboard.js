import axios from "axios";
import React from "react";
import { withRouter } from "react-router";
import withAuthAdmin from "./Auth/withAuthAdmin";

class GenerarScoreboard extends React.Component {
    state = {
        problemas: [],
        ids: "",
    };

    // eliminar problema
    eliminarProblema = (id) => {
        const filtrado = this.state.problemas.filter((problema) => {
            return problema.idProblema != id;
        });
        this.setState({ problemas: filtrado });
        console.log(filtrado);
    };

    // agregar un conjunto de problemas 1 o mas.
    agregarProblemas = async () => {
        var arrIDs = this.state.ids.split(",");
        this.setState({ ids: "" });

        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "/api/problemas/listaProblemasPorID",
            {
                ids: arrIDs,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );
        var arrProblemas = respuesta.data.problemas;
        for (var i = 0; i < arrProblemas.length; i++) {
            this.agregarProblemaLista(arrProblemas[i]);
        }
    };

    agregarProblemaLista = (problema) => {
        var tmpArr = this.state.problemas;
        tmpArr.push(problema);
        this.setState({ problemas: tmpArr });
    };

    generarReporte = async () => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;

        const tmpIDs = this.state.problemas.map(
            (problema) => problema.idProblema
        );

        const respuesta = await axios.post(
            "/api/Problemas/listaResutladosDeProblemas",
            {
                ids: tmpIDs,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );

        this.props.history.push("/scoreboard", {
            resultados: respuesta.data,
            problemas: this.state.problemas,
        });
    };

    render() {
        const filasProblemas = this.state.problemas.map((problema) => {
            return (
                <tr>
                    <td>{problema.idProblema}</td>
                    <td>{problema.nombre}</td>
                    <td>{problema.categoria}</td>
                    <td>{problema.dificultad}</td>
                    <td>{problema.noResueltos}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                this.eliminarProblema(problema.idProblema)
                            }
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h1 className="centrado">Generar Scoreboard</h1>
                <div className="top-3">
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">
                                ID PROBLEMA
                            </label>
                            <input
                                className="form-control"
                                placeholder="ID o ID's"
                                value={this.state.ids}
                                onChange={(event) =>
                                    this.setState({ ids: event.target.value })
                                }
                            />
                        </div>
                    </form>
                    <button
                        className="btn btn-success top-1"
                        onClick={() => this.agregarProblemas()}
                    >
                        Agregar
                    </button>
                </div>
                <div className="top-3">
                    <button
                        className="btn btn-success"
                        onClick={() => this.generarReporte()}
                    >
                        Generar reporte
                    </button>
                </div>
                <div className="top-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Dificultad</th>
                                <th scope="col">No. Resueltos</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>{filasProblemas}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withAuthAdmin(withRouter(GenerarScoreboard));
