import "../General.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import withAuthAdmin from "../Auth/withAuthAdmin";
import { withRouter } from "react-router";

function ListaGrupos({ history }) {
  const [state, setState] = useState({});
  const [nombreGrupo, setNombreGrupo] = useState("");

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

  const actualizaNombreGrupo = (event) => {
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
              onChange={actualizaNombreGrupo}
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

export default withAuthAdmin(withRouter(ListaGrupos));
