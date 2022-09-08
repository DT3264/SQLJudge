import "../General.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import withAuthAlumno from "../Auth/withAuthAlumno";
import withAuthAdmin from "./../DetalleProblemasAlumno";

function ListaGruposAlumno() {
  const [state, setState] = useState({});

  const populateData = async () => {
    var valueToken = "Bearer " + localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: valueToken,
    };
    const respuesta = await axios.get("/api/Grupos/obtenerGruposAlumno", {
      headers: headers,
    });
    setState({ grupos: respuesta.data });
  };

  const ListaAMostrar = state?.grupos?.map((grupo) => {
    return (
      <tr key={grupo.idGrupo}>
        <td>{grupo.nombre}</td>
      </tr>
    );
  });

  useEffect(() => {
    populateData();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <h1>
          Grupos inscritos:{" "}
          {typeof state?.grupos !== "undefined" ? state.grupos.length : 0}{" "}
        </h1>
      </div>
      <div
        style={{
          marginBottom: "1rem",
        }}
      ></div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Grupo</th>
                </tr>
              </thead>
              <tbody>{ListaAMostrar}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ListaGruposAlumno);
