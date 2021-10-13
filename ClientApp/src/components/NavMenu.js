import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
  }

  render () {

    var listOfLinks;
    var loginSection;

    if(this.props.userType === 0){
        listOfLinks = (
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                </li>
            </ul>
        );
        loginSection = (
            <div>
                <Link class="btn btn-light" type="submit" to="/login">
                    Iniciar Sesion
                </Link>
                <Link class="btn btn-light" type="submit" to="/registro">
                    Registrarse
                </Link>
            </div>
        );
    }

    if(this.props.userType === 1 || this.props.userType === 2){
        loginSection = (
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Andros
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/fetch-data">Ver perfil</Link></li>
                        <li><Link className="dropdown-item" to="/fetch-data">Cerrar</Link></li>
                    </ul>
                </li>
            </ul>
        );
    }

    if(this.props.userType === 1){
        listOfLinks = (
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link className="nav-link" to="/notFound">Problemset</Link>
                    </li>
                </ul>
        );
    }
    if(this.props.userType === 2){
        listOfLinks = (
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <Link className="nav-link" to="/notFound">Problemset</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/notFound">Scoreboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/generar-codigos">Generar Codigo Registro</Link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Usuarios
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/lista-usuarios">Ver Usuarios</Link></li>
                        <li><Link className="dropdown-item" to="/fetch-data">Crear Docente</Link></li>
                    </ul>
                </li>
            </ul>
        );
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <div class="container-fluid container">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">SQL Judge</Link>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        {listOfLinks}
                        <form class="d-flex">
                            {loginSection}
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
  }
}
