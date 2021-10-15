import React from "react";
import Validaciones from "./Validaciones";
import "./General.css";

class Login extends React.Component {

    state = {
        usuario : '',
        mensajeUsuario : '',
        clave : '',
        mensajeClave : ''
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    logUser = () => {
        var esPosible = true;
        var validaciones = new Validaciones();

        /// return booleano, mensaje
        var testNombreUsuario = validaciones.validarNombreUsuario(
            this.state.usuario
        );
        var testClave = validaciones.validarPassword(
            this.state.clave
        );

        this.setState({mensajeUsuario : testNombreUsuario[1] , mensajeClave : testClave[1]});

        if(!testNombreUsuario[0]){ 
             esPosible = false;
        }
        if(!testClave[0]){
            esPosible = false;
        }

        if(esPosible){
            alert("logeado con exito");
        }
        else{
            alert("algo no esta bien");
        }
    }

    render(){
        return (
            <div> 
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="form-group" style={{margin: "5% 30% 5% 30%"}}>
                    <label>Usuario: </label>
                    <input 
                        name = "usuario"
                        className="form-control"
                        onChange= { this.handleInputChange }
                        value= {this.state.usuario} 
                           
                    />
                    <p className="error-validacion">{this.state.mensajeUsuario}</p>
                    <label>Clave: </label>
                    <input 
                        name = "clave"
                        className="form-control" 
                        type="password"
                        onChange= { this.handleInputChange }
                        value= {this.state.clave}
                    />
                    <p className = "error-validacion">{this.state.mensajeClave}</p>
                    
                    <button className="btn btn-success" onClick ={this.logUser}  style={{marginTop: "10px"}}>Ingresar</button>
                </div>
            </form> 
        </div> 
        );
    }
}

export default Login;