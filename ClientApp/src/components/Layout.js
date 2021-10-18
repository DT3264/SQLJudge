import React from "react";
import { withRouter } from "react-router";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu.js";

class Layout extends React.Component {
    static displayName = Layout.name;

    render() {
        const isAuth = sessionStorage.getItem("tipoUsuario");
        const usuario = sessionStorage.getItem("usuario");
        var userType = 0;
        if (isAuth) {
            if (isAuth === "Admin") userType = 2;
            if (isAuth === "Alumno") userType = 1;
        }

        return (
            <div>
                <NavMenu userType={userType} usuario={usuario} />
                <Container>{this.props.children}</Container>
            </div>
        );
    }
}
export default withRouter(Layout);
