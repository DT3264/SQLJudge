import React from "react";

class EditProblemData extends React.Component {
    render() {
        return (
            <div>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">
                            Titulo del Problema
                        </label>
                        <input className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Dificultad</label>
                        <input type="number" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label for="inputState" className="form-label">
                            Categoria
                        </label>
                        <select id="inputState" className="form-select">
                            <option>Choose...</option>
                            <option>BASICO</option>
                            <option>JOINS</option>
                            <option>CONSULTAS CORRELACIONADAS</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label for="inputState" className="form-label">
                            Base de datos de origen
                        </label>
                        <select id="inputState" className="form-select">
                            <option>Nwind</option>
                            <option>Sakila</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            Código de la solución
                        </label>
                        <textarea
                            className="form-control"
                            style={{ height: "18rem" }}
                        ></textarea>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            Descripción del problema
                        </label>
                        <textarea
                            className="form-control"
                            style={{ height: "10rem" }}
                        ></textarea>
                    </div>
                    <div className="col-md-12">
                        <div class="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                for="flexCheckDefault"
                            >
                                Comprobar orden de filas
                            </label>
                        </div>
                    </div>
                </form>
                <button
                    className="btn btn-success"
                    style={{ marginTop: "1rem" }}
                >
                    Guardar Problema
                </button>
            </div>
        );
    }
}

export default EditProblemData;
