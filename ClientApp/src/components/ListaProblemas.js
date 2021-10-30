import React from "react";
import axios from 'axios';

// recibe un arreglo de problemas "problems" como props.

class ListaProblemas extends React.Component {
    state = { problemas: [] };

    cargarProblemas = () => {
        this.setState({ problemas: this.props.problems });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.problems !== this.props.problems) {
            this.cargarProblemas();
        }
    }

    componentDidMount() {
        this.cargarProblemas();
    }
    render() {
        const mostrarProblemas = this.state.problemas.map((problema) => {
            return (
                <tr>
                    <td>{problema.id}</td>
                    <td>{problema.nombre}</td>
                    <td>{problema.categoria}</td>
                    <td>{problema.dificultad}</td>
                    <td>{problema.noResueltos}</td>
                </tr>
            );
        });
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "5rem",
                }}
            >
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Dificultad</th>
                            <th>No. Resueltos</th>
                        </tr>
                    </thead>
                    <tbody>{mostrarProblemas}</tbody>
                </table>
            </div>
        );
    }
}





export default ListaProblemas;