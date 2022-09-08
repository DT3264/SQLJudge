import "../General.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import withAuthAlumno from "../Auth/withAuthAlumno";
import withAuthAdmin from "./../DetalleProblemasAlumno";

function ListaGruposAlumno() {
  const [state, setState] = useState({});
  const [codigoClase, setcodigoClase] = useState("");

  const eliminaGrupo = async (id) => {
    var valueToken = "Bearer " + localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: valueToken,
      },
    };
    const response = await axios.delete(`/api/Grupos/${id}`, headers);
    console.log(response);
    populateData();
  };

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

  const inscribirAGrupo = async () => {
    console.log(codigoClase);
    var valueToken = "Bearer " + localStorage.getItem("token");
    console.log(valueToken);
    const headers = {
      "Content-Type": "application/json",
      Authorization: valueToken,
    };
    const response = await axios.post(
      "/api/Grupos/inscribirAGrupo",
      { codigoClase: codigoClase },
      {
        headers: headers,
      }
    );
    console.log(response);
    setcodigoClase("");
    populateData();
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    setcodigoClase(value);
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
        <div className="row mb-1 justify-content-center">
          <div className="d-grid col-3 mx-auto">
            <input
              placeholder="Codigo del grupo"
              name="titulo"
              className="form-control"
              value={codigoClase}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-1 justify-content-center">
          <div className="d-grid col-3 mx-auto">
            <button
              className="btn mr-0 btn-success"
              onClick={() => inscribirAGrupo()}
            >
              Inscribirse al grupo
            </button>
          </div>
        </div>
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
