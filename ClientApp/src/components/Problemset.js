import React from "react";
import ListaProblemas from "./ListaProblemas";
import withAuthGeneral from "./Auth/withAuthGeneral.js";

class Problemset extends React.Component {

    problems = [
        {
            id : 21,
            nombre : "Ciudades de Mexico",
            categoria : "BASICO",
            dificultad : 800,
            noResueltos : 45
        },
        {
            id : 5,
            nombre : "Municipios de Yuriria",
            categoria : "JOINS",
            dificultad : 500,
            noResueltos : 100
        },
        {
            id : 1,
            nombre : "Ordenes Wallmart 1998",
            categoria : "SUBCONSULTAS CORRELACIONADAS",
            dificultad : 1200,
            noResueltos : 35
        },
        {
            id : 123,
            nombre : "Paises de Europa",
            categoria : "VARIAS TABLAS",
            dificultad : 900,
            noResueltos : 34
        },
        {
            id : 33,
            nombre : "Empleados de OXXO",
            categoria : "AGRUPACIONES",
            dificultad : 1400,
            noResueltos : 800
        },
    ]

    render(){
        return(
            <div>
                <ListaProblemas problems={this.problems} />
            </div>
        );
    }
}

export default withAuthGeneral( Problemset );