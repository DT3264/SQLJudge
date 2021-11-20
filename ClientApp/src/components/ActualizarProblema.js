import React from "react";
import EditProblemData from "./EditProblemData";
import axios from "axios";
import withAuthAdmin from "./Auth/withAuthAdmin";
import { withRouter } from "react-router";

class ActualizarProblema extends React.Component {
    actualizarProblema = async (problema) => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        await axios.post(
            "/api/problemas/modificarProblema",
            {
                idProblema: problema.idProblema,
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
        const problema = this.props.location.state.problema1;

        console.log(problema);

        return (
            <div>
                <EditProblemData
                    problema={{
                        descripcion: problema.descripcion,
                        dificultad: problema.dificultad,
                        idBaseDeDatos: problema.idBaseDeDatos,
                        idCategoria: problema.idCategoria,
                        idProblema: problema.idProblema,
                        nombre: problema.nombre,
                        solucion: problema.solucion,
                    }}
                    onSubmit={this.actualizarProblema}
                />
            </div>
        );
    }
}
export default withAuthAdmin(withRouter(ActualizarProblema));
