import React from "react";
import withAuthAdmin from "./Auth/withAuthAdmin";
import CardAlumnoProblemas from "./CardAlumnoProblemas";

class DetalleProblemasAlumno extends React.Component {
    state = {
        nombreAlumno: "Luis Andres Gutierrez Calderon",
        usuario: "AndrosGreen",
        envios: 40,
        aceptados: 33,
        incorrectos: 20,
        error: 15,
        problemasResueltos: [],
    };

    render() {
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
            </div>
        );
    }
}

export default withAuthAdmin(DetalleProblemasAlumno);
