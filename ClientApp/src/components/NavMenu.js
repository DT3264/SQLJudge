import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
    static displayName = NavMenu.name;

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
                    <Link
                        className="btn btn-light"
                        type="submit"
                        to="/registro"
                    >
                        Registrarse
                    </Link>
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
                            Andros
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
                                <Link
                                    className="dropdown-item"
                                    to="/fetch-data"
                                >
                                    Cerrar
                                </Link>
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
                        <Link className="nav-link" to="/notFound">
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
                        <Link className="nav-link" to="/notFound">
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
                            <form className="d-flex">{loginSection}</form>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
