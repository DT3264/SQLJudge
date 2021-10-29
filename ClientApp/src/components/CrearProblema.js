import React from "react";
import EditProblemData from "./EditProblemData";
import axios from "axios";
import withAuthAdmin from "./Auth/withAuthAdmin";
import { withRouter } from "react-router";

class CrearProblema extends React.Component {
    crearProblema = async (problema) => {
        console.log(problema);

        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        await axios.post(
            "/api/problemas/agregarProblema",
            {
                nombre: problema.titulo,
                descripcion: problema.descripcion,
                solucion: problema.codigo,
                idBaseDeDatos: problema.base,
                idCategoria: problema.idCategoria,
                dificultad: problema.dificultad,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );
        this.props.history.push("/lista-problemas");
    };

    render() {
        return <EditProblemData onSubmit={this.crearProblema} />;
    }
}

export default withRouter(withAuthAdmin(CrearProblema));
