import React from "react";
import axios from 'axios';
import { withRouter } from "react-router";
import withAuthAlumno from "./Auth/withAuthAlumno.js";
import { Link } from "react-router-dom";



class Envios extends React.Component {
    state = { envios: [], envioCodigo:""};

    cargarEnvios = async () => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "/api/Envios/enviosAlumno",
            { 
                id :  this.props.match.params.id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );

        const lista= respuesta.data;
        this.setState({
            envios: lista,
        });
      
    };


    componentDidMount() {
        this.cargarEnvios();

    }

    motrarCodigo=(codigo)=>{  
        this.setState({
            envioCodigo: codigo,
        });
       
    }

    render(){
        const mostrarEnvios = this.state.envios.map((envio) => {
            
            if(envio.estatus=="AC"){
                return (
                    <tr>
                        <td>{envio.idEnvio}</td>
                        <td style={{
                            color:"green"
                        }}>{envio.estatus}</td>
                        <td>
                            <button style={{
                                border:"none",
                                background:"none",
                                color:"black",
                                textDecoration:"underline",
                                cursor:"pointer"
                        
                            }} onClick={()=>this.motrarCodigo(envio.codigo)}>Ver codigo fuente</button>
                            </td>
                        <td>{envio.horaYFecha}</td>
                        
                    </tr>
                );
            }else if(envio.estatus=="WA"){
                return (
                    <tr>
                        <td>{envio.idEnvio}</td>
                        <td style={{
                            color:"red"
                        }}>{envio.estatus} - {envio.respuesta}</td>
                        <td>
                        <button style={{
                                border:"none",
                                background:"none",
                                color:"black",
                                textDecoration:"underline",
                                cursor:"pointer"
                        
                            }}onClick={()=>this.motrarCodigo(envio.codigo)}>Ver codigo fuente</button>
                            </td>
                        <td>{envio.horaYFecha}</td>
                        
                    </tr>
                );
            }else{
                return (
                    <tr>
                        <td>{envio.idEnvio}</td>
                        <td style={{
                            color:"orange"
                        }}>{envio.estatus}</td>
                        <td>
                        <button style={{
                                border:"none",
                                background:"none",
                                color:"black",
                                textDecoration:"underline",
                                cursor:"pointer"
                        
                            }}onClick={()=>this.motrarCodigo(envio.codigo)}>Ver codigo fuente</button>
                            </td>
                        <td>{envio.horaYFecha}</td>
                        
                    </tr>
                );

            }
        });

        return(
            <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Respuesta</th>
                        <th>Acciones</th>
                        <th>Fecha y hora</th>
                    </tr>
                </thead>
                <tbody>{mostrarEnvios}</tbody>
            </table>

            <label style={{
                fontWeight:"bold",
                marginTop:"1rem"
                
            }}>Codigo fuente:</label>
                <textarea id="txtCodigo"
                            className="form-control"
                            style={{ height: "20rem" }}
                value={this.state.envioCodigo}></textarea>
            
        </div>

        );
    }

}

export default withAuthAlumno(withRouter(Envios));