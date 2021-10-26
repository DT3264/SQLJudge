import React from "react";
import './GenerarCodigoRegistro.css';
import withAuthAdmin from './Auth/withAuthAdmin.js';
import axios from 'axios';

class GenerarCodigoRegistro extends React.Component {
    state={links:[]};

    
    obtenerCodigos = async () => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "/api/Registro/obtenerCodigosRegistro",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );
        const lista= respuesta.data;
        this.setState({
            links: lista,
        });

        console.log(this.state.links);
    };

    generarCodigo = async () => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "/api/Registro/generarCodigoRegistro",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );
           
        this.obtenerCodigos();
        
    };


    eliminarCodigo = async (idCodigo)=>{
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "/api/Registro/eliminarCodigoPorID",
            { 
                id: idCodigo
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );

        this.obtenerCodigos();
        
    };

    componentDidMount() {
        this.obtenerCodigos();
    }

    render(){
        const mostrarLinks=this.state.links.map((link) => {     
            return(     
            <tr>
                <td class="grande">{link.codigo}</td>
                <td><button class="btn btnR btn-danger" onClick={()=>this.eliminarCodigo(link.idCodigoRegistro)}>Eliminar</button></td>
            </tr>
            )
        });
        
        return (
            <div >

                <div class="tabla">
                    <table class="table caption-top" id="tablaLinks">
                    
                    <thead>
                        <tr>
                        <th scope="col" colSpan="2">Codigos disponibles</th>
                        </tr>   
                    </thead>
                    <tbody>
                        {mostrarLinks}
                    </tbody>
                    </table>
                    <button type="button"  onClick={this.generarCodigo} class="btn btnR btn-success agregar">Agregar codigo</button>
                </div>

            </div>
        );
    
    }
 

 }

export default withAuthAdmin( GenerarCodigoRegistro );