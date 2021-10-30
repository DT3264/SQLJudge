import React from "react";
import ReactMarkdown from "react-markdown";

class Redaccion extends React.Component {
    state = {
        texto: "### Descripción\n\n suma dos numeros **a** y **b**.\n\n #### Entrada\n\n Aquí va la descripción de la entrada del problema.\n\n #### Salida\n\n Esta es la descripción de la salida esperada.\n",
    };

    render() {
        return (
            <div>
                <form class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Redaccion</label>
                        <textarea
                            class="form-control"
                            id="inputEmail4"
                            value={this.state.texto}
                            onChange={(e) =>
                                this.setState({ texto: e.target.value })
                            }
                            style={{ height: "30rem" }}
                        />
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">
                            Vista Preeliminar
                        </label>
                        <ReactMarkdown children={this.state.texto} />
                    </div>
                </form>
            </div>
        );
    }
}

export default Redaccion;
