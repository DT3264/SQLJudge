import { Redirect } from "react-router-dom";
import React from "react";

const withAuthAdmin = (Component) => {
  const AuthRoute = () => {
    const isAuth = localStorage.getItem("tipoUsuario");

    if (!isAuth) return <Redirect to="notFound" />;

    if (isAuth === "Admin") {
      return <Component />;
    } else {
      return <Redirect to="notFound" />;
    }
  };
  return AuthRoute;
};

export default withAuthAdmin;
