import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      if (problema.resuelto == 1) {
        return (
          <tr
            style={{
              backgroundColor: "rgb(223, 241, 229)",
            }}
          >
            <td>{problema.idProblema}</td>
            <td>
              <Link to={"/problem/" + problema.idProblema}>
                {problema.nombre}
              </Link>{" "}
            </td>
            <td>{problema.nombreCategoria}</td>
            {/* <td>{problema.dificultad}</td> */}
            <td>{problema.noResueltos}</td>
          </tr>
        );
      } else if (problema.resuelto == 0) {
        return (
          <tr
            style={{
              backgroundColor: "rgb(255, 196, 196)",
            }}
          >
            <td>{problema.idProblema}</td>
            <td>
              <Link to={"/problem/" + problema.idProblema}>
                {problema.nombre}
              </Link>{" "}
            </td>
            <td>{problema.nombreCategoria}</td>
            {/* <td>{problema.dificultad}</td> */}
            <td>{problema.noResueltos}</td>
          </tr>
        );
      } else {
        return (
          <tr>
            <td>{problema.idProblema}</td>
            <td>
              <Link to={"/problem/" + problema.idProblema}>
                {problema.nombre}
              </Link>{" "}
            </td>
            <td>{problema.nombreCategoria}</td>
            {/* <td>{problema.dificultad}</td> */}
            <td>{problema.noResueltos}</td>
          </tr>
        );
      }
    });
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "3rem",
        }}
      >
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoria</th>
              {/* <th>
                                <div>
                                    <a
                                        href="javascript:void(0);"
                                        onClick={() =>
                                            this.props.handleChangeSort(
                                                "dificultad"
                                            )
                                        }
                                    >
                                        Dificultad v
                                    </a>
                                </div>
                            </th> */}
              <th>
                <div>
                  <a
                    href="javascript:void(0);"
                    onClick={() => this.props.handleChangeSort("resueltos")}
                  >
                    No. Resueltos v
                  </a>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{mostrarProblemas}</tbody>
        </table>
      </div>
    );
  }
}

export default ListaProblemas;
