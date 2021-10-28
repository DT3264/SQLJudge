import React from "react";
import Editor from "./Editor";

class EditProblemData extends React.Component {
    estadoBase = {
        titulo: "",
        dificultad: 0,
        descripcion: "",
    };

    state = {
        sql: "",
        formulario: this.estadoBase,
        categorias: [
            {
                id: 0,
                nombre: "BASICOS",
            },
            {
                id: 1,
                nombre: "JOINS",
            },
            {
                id: 2,
                nombre: "SUBCONSULTAS",
            },
        ],
        basesDatos: ["Nwind", "World", "Sakila"],
        categoria: 0,
        baseDatos: "",
        comprobarOrdenFilas: false,
    };

    setSQL = (value) => {
        this.setState({ sql: value });
    };

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            formulario: {
                ...this.state.formulario,
                [name]: value,
            },
        });
    };

    render() {
        const listElems = this.state.categorias.map((categoria) => {
            return (
                <option
                    onClick={() => this.setState({ categoria: categoria.id })}
                >
                    {categoria.nombre}
                </option>
            );
        });
        const listaBases = this.state.basesDatos.map((base) => {
            return (
                <option onClick={() => this.setState({ baseDatos: base })}>
                    {base}
                </option>
            );
        });

        return (
            <div>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">
                            Titulo del Problema
                        </label>
                        <input
                            name="titulo"
                            className="form-control"
                            value={this.state.formulario.titulo}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Dificultad</label>
                        <input
                            name="dificultad"
                            type="number"
                            className="form-control"
                            value={this.state.formulario.dificultad}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label for="inputState" className="form-label">
                            Categoria
                        </label>
                        <select id="inputState" className="form-select">
                            {listElems}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label for="inputState" className="form-label">
                            Base de datos de origen
                        </label>
                        <select id="inputState" className="form-select">
                            {listaBases}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            Código de la solución
                        </label>
                        <Editor value={this.state.sql} onChange={this.setSQL} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            Descripción del problema
                        </label>
                        <textarea
                            name="descripcion"
                            className="form-control"
                            style={{ height: "10rem" }}
                            value={this.state.formulario.descripcion}
                            onChange={this.handleInputChange}
                        ></textarea>
                    </div>
                    <div className="col-md-12">
                        <div class="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={this.state.comprobarOrdenFilas}
                                onChange={() =>
                                    this.setState({
                                        comprobarOrdenFilas:
                                            !this.state.comprobarOrdenFilas,
                                    })
                                }
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
