import React from "react";

class Login extends React.Component {

    state = {
        usuario : '',
        clave : ''
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render(){
        return (
            <div> 
            <form>
                <div className="form-group" style={{margin: "5% 30% 5% 30%"}}>
                    <label>Usuario: </label>
                    <input 
                        name = "usuario"
                        className="form-control"
                        onChange= { this.handleInputChange }
                        value= {this.state.usuario}    
                    />
                    <label>Clave: </label>
                    <input 
                        name = "clave"
                        className="form-control" 
                        type="password"
                        onChange= { this.handleInputChange }
                        value= {this.state.clave}
                    />
                    
                    
                    <button className="btn btn-success" style={{marginTop: "10px"}}>Ingresar</button>
                </div>
            </form> 
        </div> 
        );
    }
}

export default Login;