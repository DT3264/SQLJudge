import React from "react";
import './GenerarCodigosRegistro.css';

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
            let fila = document.createElement("tr");
    
            let tdFila = document.createElement("td");
            let nombre= document.createTextNode(link.link);
            tdFila.appendChild(nombre);
    
            let tdBoton=document.createElement("td");
            let boton= document.createElement("button");
            boton.innerText="Eliminar";
            boton.setAttribute("class","btn btn-danger ");
           
            tdBoton.append(boton);
    
            fila.append(tdFila);
            fila.append(tdBoton);
    
            var tbody=document.querySelector("#tablaLinks tbody");
            tbody.append(fila);
        });
     
        return (
            <div >

                <div class="tabla">
                    <table class="table caption-top" id="tablaLinks">
                    
                    <thead>
                        <tr>
                        <th scope="col" colSpan="2">Links disponibles</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr >
                            <td class="grande">dhsjakjshdgsjfdsadfghgfdsdfghakl</td>
                            <td> <button type="button" class="btn btn-danger ">Eliminar link</button></td>
                        </tr>
                        <tr>
                            <td class="grande">ewqisjhjxsakjsnxsa</td>
                            <td> <button type="button" class="btn btn-danger ">Eliminar link</button></td>
                        </tr>
                        <tr>
                            <td class="grande">dwshqisjxbiswkwc</td>
                            <td> <button type="button" class="btn btn-danger ">Eliminar link</button></td>
                        </tr>
                        <tr>
                            <td class="grande">efgfdsasdefrgfd</td>
                            <td> <button type="button" class="btn btn-danger ">Eliminar link</button></td>
                        </tr>
                    
                    
                    </tbody>
                    </table>
                    <button type="button"  onClick={this.agregarLink} class="btn btn-success agregar">Agregar link</button>
                    {mostrarLinks}
               
                </div>
                

            </div>
        );


        
    }

 


 }

export default GenerarCodigoRegistro;