import React from "react";

class Scoreboard extends React.Component {
    state = {
        problemas: [
            {
                id: 1,
                nombre: "Ciudades de Mexico",
            },
            {
                id: 33,
                nombre: "Pedidos de Amazon",
            },
            {
                id: 5,
                nombre: "Ordenes de Walmart",
            },
            {
                id: 7,
                nombre: "Estados de Japon",
            },
        ],
        resultados: [
            {
                usuario: "Andros_",
                nombreCompleto: "Luis Andres Gutierrez Calderon",
                veredictos: ["AC", "WA", "AC", "RT"],
            },
            {
                usuario: "alexia_oficial",
                nombreCompleto: "Jocelyn Alexia Aguilera Martinez",
                veredictos: ["AC", "AC", "RT", "WA"],
            },
            {
                usuario: "Batman",
                nombreCompleto: "Bruce Wayne Al-ghul",
                veredictos: ["NT", "AC", "AC", "AC"],
            },
        ],
    };

    componentDidMount() {
        this.getHeaders();
    }

    getHeaders = () => {
        var indice = 64;
        var problemHeaders = [];
        for (var i = 0; i < this.state.problemas.length; i++) {
            indice++;
            problemHeaders.push(String.fromCharCode(indice));
        }
        return problemHeaders;
    };

    render() {
        const tableHeaders = this.getHeaders().map((elem) => {
            return <th className="header-tabla">{elem}</th>;
        });
        const tableRows = this.state.resultados.map((user) => {
            const resultadosProblemas = user.veredictos.map((result) => {
                var clase = "";

                if (result === "AC") clase = "accepted";
                if (result === "WA") clase = "wrong-answer";
                if (result === "RT") clase = "error";
                return <td className={clase}></td>;
            });

            return (
                <tr>
                    <th>{user.nombreCompleto}</th>
                    {resultadosProblemas}
                </tr>
            );
        });

        var index = 64;
        const tableRowsProblems = this.state.problemas.map((problem) => {
            return (
                <tr>
                    <td className="centrado">{problem.id}</td>
                    <td>
                        <b>{problem.nombre}</b>
                    </td>
                    <td className="centrado">
                        {" "}
                        <b> {String.fromCharCode(++index)} </b>{" "}
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <nav className="centrado">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                            class="nav-link active flex-sm-fill text-sm-center"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                        >
                            Scoreboard
                        </button>
                        <button
                            class="nav-link flex-sm-fill text-sm-center"
                            id="nav-profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-profile"
                            type="button"
                            role="tab"
                            aria-controls="nav-profile"
                            aria-selected="false"
                        >
                            Problemas
                        </button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div
                        class="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                    >
                        <table class="table table-bordered">
                            <thead>
                                <tr class="table-heading">
                                    <th className="header-tabla">Usuario</th>
                                    {tableHeaders}
                                </tr>
                            </thead>
                            <tbody>{tableRows}</tbody>
                        </table>
                    </div>
                    <div
                        class="tab-pane fade"
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                    >
                        <table class="table table-bordered">
                            <thead>
                                <tr class="table-heading">
                                    <th className="header-tabla">ID</th>
                                    <th className="header-tabla">Problema</th>
                                    <th className="header-tabla">Indice</th>
                                </tr>
                            </thead>
                            <tbody>{tableRowsProblems}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Scoreboard;
