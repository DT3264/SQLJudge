import React from "react";

class CardAlumnoProblemas extends React.Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header">Alumno</div>
                    <div className="card-body">
                        <h3 className="card-title">
                            {this.props.nombre} <b>({this.props.usuario})</b>
                        </h3>
                        <br />
                        <div class="container">
                            <div class="row">
                                <div class="col-sm">
                                    <b>Envios:</b> {this.props.envios}
                                </div>
                                <div class="col-sm">
                                    <b style={{ color: "green" }}>Aceptados:</b>{" "}
                                    {this.props.aceptados}
                                </div>
                                <div class="col-sm">
                                    <b style={{ color: "red" }}>Incorrectas:</b>{" "}
                                    {this.props.incorrectos}
                                </div>
                                <div class="col-sm">
                                    <b style={{ color: "orange" }}>Error: </b>
                                    {this.props.error}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardAlumnoProblemas;
