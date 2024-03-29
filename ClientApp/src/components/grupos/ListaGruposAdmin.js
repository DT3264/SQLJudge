import "../General.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import withAuthAdmin from "./../DetalleProblemasAlumno";

function ListaGruposAdmin({ history, ...props }) {
  const [state, setState] = useState({});
  const [nombreGrupo, setNombreGrupo] = useState("");

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
    const respuesta = await axios.get("/api/Grupos/gruposAdministrados", {
      headers: headers,
    });
    setState({ grupos: respuesta.data });
  };

  const creaGrupo = async () => {
    console.log(nombreGrupo);
    var valueToken = "Bearer " + localStorage.getItem("token");
    console.log(valueToken);
    const headers = {
      "Content-Type": "application/json",
      Authorization: valueToken,
    };
    const response = await axios.post(
      "/api/Grupos/creaGrupo",
      { nombre: nombreGrupo },
      {
        headers: headers,
      }
    );
    console.log(response);
    setNombreGrupo("");
    populateData();
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    setNombreGrupo(value);
  };

  const ListaAMostrar = state?.grupos?.map((grupo) => {
    return (
      <tr key={grupo.idGrupo}>
        <td>{grupo.nombre}</td>
        <td>{grupo.codigoClase}</td>
        <td>{grupo.registros}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => eliminaGrupo(grupo.idGrupo)}
          >
            Eliminar grupo
          </button>
        </td>
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
          {" "}
          Grupos administrados:{" "}
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
              placeholder="Nombre de nuevo grupo"
              name="titulo"
              className="form-control"
              value={nombreGrupo}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-1 justify-content-center">
          <div className="d-grid col-3 mx-auto">
            <button
              className="btn mr-0 btn-success"
              onClick={() => creaGrupo()}
            >
              Crea grupo
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Grupo</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Alumnos inscritos</th>
                  <th scope="col">Acciones</th>
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

export default withRouter(ListaGruposAdmin);
