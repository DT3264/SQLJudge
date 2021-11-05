import React from "react";
import withAuthGeneral from "./Auth/withAuthGeneral";
import axios from 'axios';
import { withRouter } from "react-router";

class VistaProblema extends React.Component {

    state = {
        nombre : '',
        id : 0,
        categoria : '',
        baseDatos : '',
        descripcion : '',
        resueltos : 0
    }
    
    componentDidMount() {
        //console.log(this.props);
        this.getVistaProblema(1);
    }

    getVistaProblema =  async (id) => {
        try{
            var valueToken = "Bearer " + sessionStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
                Authorization: valueToken,
            };
            const respuesta = await axios.post(
                "/api/Problemas/vistaProblema",
                {
                    id : this.props.match.params.id
                },
                {
                    headers: headers,
                }
            );
            this.setState({ usuarios: respuesta.data });
            this.setState({ id: respuesta.data.id });
            this.setState({ nombre: respuesta.data.nombre });
            this.setState({ categoria: respuesta.data.categoria });
            this.setState({ baseDatos: respuesta.data.baseDatos });
            this.setState({ descripcion: respuesta.data.descripcion });
            this.setState({ resueltos: respuesta.data.resueltos });
        }
        catch{
            
        }
        //console.log(this.props.match.params);
    }

    render(){
        return(
            <div>
                <h1 style={{textAlign : "center"}}>{this.state.nombre}</h1>
                <div>
                    <p style={{textAlign : "center"}}> <b>ID:</b>  {this.state.id}   <b>Categoria:</b> {this.state.categoria} <b>Base de datos:</b> {this.state.baseDatos} <b>No. Resueltos:</b> {this.state.resueltos} <br/></p>
                </div>
                <button type="button" class="btn btn-primary">Ver envios</button>
                <div  style={{marginTop : "2rem"}}>
                    <p style={{textAlign : "justify"}}>{this.state.descripcion}</p>
                </div>
                <div>
                    <label>Codigo fuente : </label>
                    <textarea
                        className="form-control"
                        style={{ height: "25rem" }}
                    ></textarea>
                </div>
                <div style={{marginTop : "2rem"}}>
                    <button type="button" class="btn btn-success">Enviar</button> 
                </div>
            </div>
        );
    }
}

export default withAuthGeneral( withRouter( VistaProblema ));