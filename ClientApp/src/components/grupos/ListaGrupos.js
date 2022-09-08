import "../General.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import withAuthAdmin from "../Auth/withAuthAdmin";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import ListaGruposAlumno from "./ListaGruposAlumno";
import withAuthGeneral from "./../VistaProblema";
import ListaGruposAdmin from "./ListaGruposAdmin";

function ListaGrupos() {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const isAuth = localStorage.getItem("tipoUsuario");
  if (!isAuth) {
    return <Redirect to="notFound" />;
  } else {
    if (tipoUsuario === "Admin") return <ListaGruposAdmin />;
    if (tipoUsuario === "Alumno") return <ListaGruposAlumno />;
    else return <Redirect to="notFound" />;
  }
}

export default withRouter(ListaGrupos);
