import React from "react";
import './GenerarCodigoRegistro.css';

class GenerarCodigoRegistro extends React.Component {
    state={links:[], link:""};

    agregarLink = () => {  
        this.setState({
            link: "nuevo",
            indice: this.state.links.length,
            links: this.state.links.concat({
                link: this.state.link,
            }),
        });
       
    };
    
    render(){
        const mostrarLinks=this.state.links.map((link) => {
            return(
            <tr>
                <td class="grande">Nuevo codigo</td>
                <td><button class="btn btnR btn-danger ">Eliminar</button></td>
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
                    <button type="button"  onClick={this.agregarLink} class="btn btnR btn-success agregar">Agregar codigo</button>
                    
               
                </div>
                

            </div>
        );


        
    }

 


 }

export default GenerarCodigoRegistro;