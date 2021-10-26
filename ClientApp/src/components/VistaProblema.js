import React from "react";
import withAuthGeneral from "./Auth/withAuthGeneral";

class VistaProblema extends React.Component {
    render(){
        return(
            <div>
                VistaProblema
            </div>
        );
    }
}

export default withAuthGeneral( VistaProblema );