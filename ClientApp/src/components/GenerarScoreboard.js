import React from "react";

class GenerarScoreboard extends React.Component {
    state = {
        problemas: [
            {
                id: 1,
                nombre: "Ordenes de Walmart",
                categoria: "JOIN",
                dificultad: 1200,
                noResueltos: 34,
            },
            {
                id: 2,
                nombre: "Municipios de Mexico",
                categoria: "SUBCONSULTAS",
                dificultad: 1200,
                noResueltos: 34,
            },
            {
                id: 4,
                nombre: "Ciudades de Mexico",
                categoria: "BASICO",
                dificultad: 900,
                noResueltos: 6,
            },
            {
                id: 33,
                nombre: "Pedidos de Amazon",
                categoria: "JOIN",
                dificultad: 800,
                noResueltos: 13,
            },
        ],
        ids: "",
    };

    // eliminar problema
    eliminarProblema = (id) => {
        const filtrado = this.state.problemas.filter((problema) => {
            return problema.id != id;
        });
        this.setState({ problemas: filtrado });
        console.log(filtrado);
    };

    // agregar un conjunto de problemas 1 o mas.
    agregarProblemas = async () => {
        var arrIDs = this.state.ids.split(",");
        this.setState({ ids: "" });
        for (var i = 0; i < arrIDs.length; i++) {
            this.agregarProblemaLista(i);
        }
    };

    agregarProblemaLista = (id) => {
        var tmpArr = this.state.problemas;
        tmpArr.push({
            id: 33,
            nombre: "Pedidos de Amazon",
            categoria: "JOIN",
            dificultad: 800,
            noResueltos: 13,
        });
        this.setState({ problemas: tmpArr });
    };

    render() {
        const filasProblemas = this.state.problemas.map((problema) => {
            return (
                <tr>
                    <td>{problema.id}</td>
                    <td>{problema.nombre}</td>
                    <td>{problema.categoria}</td>
                    <td>{problema.dificultad}</td>
                    <td>{problema.noResueltos}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.eliminarProblema(problema.id)}
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
                    <button className="btn btn-success">Generar reporte</button>
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

export default GenerarScoreboard;
