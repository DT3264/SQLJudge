import React from "react";
import ListaProblemas from "./ListaProblemas";
import withAuthGeneral from "./Auth/withAuthGeneral.js";
import axios from "axios";

class Problemset extends React.Component {
    state = { problems: [] };

    componentDidMount() {
        this.cargarProblemas();
    }

    cargarProblemas = async () => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "/api/Problemas/listaProblemas",
            {
                categorias: [0],
                ordenaPor: "resueltos",
                ascendente: false,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );
        console.log(respuesta.data);
        this.setState({ problems: respuesta.data });
    };

    render() {
        console.log(this.state.problems);
        return (
            <div>
                <ListaProblemas problems={this.state.problems} />
            </div>
        );
    }
}

export default withAuthGeneral( Problemset );