import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./NavMenu.css";
import Registro from "./Registro";

class NavMenu extends Component {
    static displayName = NavMenu.name;

    state = {
        modalRegistro: false,
    };

    abrirModal = () => {
        this.setState({ modalRegistro: true });
    };

    cerrarModal = () => {
        this.setState({ modalRegistro: false });
    };

    logOut = () => {
        sessionStorage.removeItem("usuario");
        sessionStorage.removeItem("tipoUsuario");
        sessionStorage.removeItem("token");
        this.props.history.push("/");
    };

    render() {
        var listOfLinks;
        var loginSection;

        if (this.props.userType === 0) {
            listOfLinks = (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"></li>
                </ul>
            );
            loginSection = (
                <div>
                    <Link className="btn btn-light" type="submit" to="/login">
                        Iniciar Sesion
                    </Link>
                    <button className="btn btn-light" onClick={this.abrirModal}>
                        Registrarse
                    </button>
                </div>
            );
        }

        if (this.props.userType === 1 || this.props.userType === 2) {
            loginSection = (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            id="navbarDropdown"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {this.props.usuario}
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdown"
                        >
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/fetch-data"
                                >
                                    Ver perfil
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={this.logOut}
                                >
                                    Cerrar
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            );
        }

        if (this.props.userType === 1) {
            listOfLinks = (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link className="nav-link" to="/problemset">
                            Problemset
                        </Link>
                    </li>
                </ul>
            );
        }
        if (this.props.userType === 2) {
            listOfLinks = (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/problemset">
                            Problemset
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notFound">
                            Scoreboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/generar-codigos">
                            Generar Codigo Registro
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Usuarios
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdown"
                        >
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/lista-usuarios"
                                >
                                    Ver Usuarios
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/fetch-data"
                                >
                                    Crear Docente
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Problemas
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdown"
                        >
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/lista-usuarios"
                                >
                                    Ver problemas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/crear-problema"
                                >
                                    Crear Problema
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            );
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                    <div className="container-fluid container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo03"
                            aria-controls="navbarTogglerDemo03"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link className="navbar-brand" to="/">
                            SQL Judge
                        </Link>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarTogglerDemo03"
                        >
                            {listOfLinks}
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="d-flex"
                            >
                                {loginSection}
                            </form>
                        </div>
                    </div>
                </nav>
                <Registro
                    abrirModal={this.abrirModal}
                    cerrarModal={this.cerrarModal}
                    modalShow={this.state.modalRegistro}
                />
            </div>
        );
    }
}

export default withRouter(NavMenu);