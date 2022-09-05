import { Redirect } from "react-router-dom";
import React from "react";

const withAuthGeneral = (Component) => {
  const AuthRoute = () => {
    const isAuth = localStorage.getItem("tipoUsuario");
    if (!isAuth) {
      return <Redirect to="notFound" />;
    } else {
      return <Component />;
    }
  };
  return AuthRoute;
};

export default withAuthGeneral;
