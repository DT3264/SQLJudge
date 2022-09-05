import React from "react";
import withAuthAdmin from "./Auth/withAuthAdmin.js";
import axios from "axios";

class GenerarCodigoRegistro extends React.Component {
  state = { links: [] };

  obtenerCodigos = async () => {
    const token = localStorage.getItem("token");
    const tmp_token = "Bearer " + token;
    const respuesta = await axios.post(
      "/api/Registro/obtenerCodigosRegistro",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: tmp_token,
        },
      }
    );
    const lista = respuesta.data;
    this.setState({
      links: lista,
    });

    console.log(this.state.links);
  };

  generarCodigo = async () => {
    const token = localStorage.getItem("token");
    const tmp_token = "Bearer " + token;
    const respuesta = await axios.post(
      "/api/Registro/generarCodigoRegistro",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: tmp_token,
        },
      }
    );

    this.obtenerCodigos();
  };

  eliminarCodigo = async (idCodigo) => {
    const token = localStorage.getItem("token");
    const tmp_token = "Bearer " + token;
    const respuesta = await axios.post(
      "/api/Registro/eliminarCodigoPorID",
      {
        id: idCodigo,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: tmp_token,
        },
      }
    );

    this.obtenerCodigos();
  };

  componentDidMount() {
    this.obtenerCodigos();
  }

  render() {
    const mostrarLinks = this.state.links.map((link) => {
      return (
        <tr style={{ fontSize: "1.1rem" }}>
          <td
            style={{
              textAlign: "center",
            }}
          >
            {link.codigo}
          </td>
          <td
            style={{
              width: "30%",
            }}
          >
            <button
              class="btn btnR btn-danger"
              onClick={() => this.eliminarCodigo(link.idCodigoRegistro)}
            >
              Eliminar
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5rem",
          }}
        >
          <table
            class="table"
            id="tablaLinks"
            style={{
              width: "50%",
            }}
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  colSpan="2"
                  style={{
                    paddingLeft: "7rem",
                    fontSize: "1.3rem",
                  }}
                >
                  Codigos disponibles
                </th>
              </tr>
            </thead>
            <tbody>{mostrarLinks}</tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginLeft: "26rem",
          }}
        >
          <button
            type="button"
            onClick={this.generarCodigo}
            class="btn btnR btn-success agregar"
          >
            Agregar codigo
          </button>
        </div>
      </div>
    );
  }
}

export default withAuthAdmin(GenerarCodigoRegistro);
