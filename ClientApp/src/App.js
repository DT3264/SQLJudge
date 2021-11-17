import React, { Component } from "react";
import Layout from "./components/Layout.js";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./custom.css";
import PageNotFound from "./components/PageNotFound";
import GenerarCodigoRegistro from "./components/GenerarCodigoRegistro";
import Login from "./components/Login";
import Registro from "./components/Registro";
import ListaUsuarios from "./components/ListaUsuarios";
import Problemset from "./components/Problemset.js";
import VistaProblema from "./components/VistaProblema.js";
import CrearProblema from "./components/CrearProblema.js";
import ListadoProblemas from "./components/ListadoProblemas.js";
import ActualizarProblema from "./components/ActualizarProblema.js";
import Redaccion from "./components/Redaccion.js";
import DetalleProblemasAlumno from "./components/DetalleProblemasAlumno.js";
import GenerarScoreboard from "./components/GenerarScoreboard.js";
import Scoreboard from "./components/Scoreboard.js";
import ListaAlumnos from "./components/ListaAlumnos.js";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/counter" component={Counter} />
                    <Route path="/fetch-data" component={FetchData} />
                    <Route path="/notFound" component={PageNotFound} />
                    <Route
                        path="/generar-codigos"
                        component={GenerarCodigoRegistro}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/registro" component={Registro} />
                    <Route path="/lista-usuarios" component={ListaUsuarios} />
                    <Route path="/lista-alumnos" component={ListaAlumnos} />
                    <Route path="/problemset" component={Problemset} />
                    <Route path="/problem/:id" component={VistaProblema} />
                    <Route path="/crear-problema" component={CrearProblema} />
                    <Route
                        path="/lista-problemas"
                        component={ListadoProblemas}
                    />
                    <Route
                        path="/actualizar-problema"
                        component={ActualizarProblema}
                    />
                    <Route path="/redaccion" component={Redaccion} />
                    <Route
                        path="/envios/alumno/:id"
                        component={DetalleProblemasAlumno}
                    />
                    <Route
                        path="/generar-reporte"
                        component={GenerarScoreboard}
                    />
                    <Route path="/scoreboard" component={Scoreboard} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Layout>
        );
    }
}
