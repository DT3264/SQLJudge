import React from "react";
import Editor from "./Editor";
import Validaciones from "./Validaciones.js";
import axios from "axios";

class EditProblemData extends React.Component {
    estadoBase = {
        titulo: "",
        dificultad: 0,
        descripcion: "",
    };

    state = {
        sql: "",
        formulario: this.estadoBase,
        formularioErrores: this.estadoBase,
        categorias: [],
        basesDatos: [
            {
                id: 1,
                nombre: "world",
            },
            {
                id: 2,
                nombre: "nwind",
            },
            {
                id: 3,
                nombre: "sakila",
            },
        ],
        categoria: 1,
        baseDatos: 1,
        comprobarOrdenFilas: false,
        idProblema: -1,
    };

    componentDidMount() {
        this.cargarCategorias();
        if (this.props.problema) {
            this.setState({
                formulario: {
                    ...this.state.formulario,
                    titulo: this.props.problema.nombre,
                    dificultad: this.props.problema.dificultad,
                    descripcion: this.props.problema.descripcion,
                },
                categoria: this.props.problema.idCategoria,
                sql: this.props.problema.solucion,
                baseDatos: this.props.problema.idBaseDeDatos,
                idProblema: this.props.problema.idProblema,
            });
        }
    }

    cargarCategorias = async () => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "/api/Categorias/obtenerCategorias",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );
        this.setState({
            categorias: respuesta.data,
        });
        //this.setState({ categoria: this.state.categorias[0].idCategoria });
    };

    limpiarEstado = () => {
        this.setState({
            formulario: this.estadoBase,
            sql: "",
            comprobarFilas: false,
        });
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

    validar = () => {
        var esPosible = true;
        var validaciones = new Validaciones();

        var testTitulo = validaciones.validarTituloProblema(
            this.state.formulario.titulo
        );
        var testDescripcion = validaciones.validarDescripcion(
            this.state.formulario.descripcion
        );

        if (!testTitulo[0]) esPosible = false;
        if (!testDescripcion) esPosible = false;

        this.setState({
            formularioErrores: {
                ...this.state.formularioErrores,
                titulo: testTitulo[1],
                descripcion: testDescripcion[1],
            },
        });

        return esPosible;
    };

    handleButtonPressed = () => {
        console.log(this.state.categoria);
        console.log(this.state.baseDatos);
        if (this.validar()) {
            this.props.onSubmit({
                titulo: this.state.formulario.titulo,
                descripcion: this.state.formulario.descripcion,
                idCategoria: this.state.categoria,
                base: this.state.baseDatos,
                dificultad: this.state.formulario.dificultad,
                codigo: this.state.sql,
                comprobarFilas: this.state.comprobarOrdenFilas,
                idProblema: this.state.idProblema,
            });
            this.limpiarEstado();
        }
    };

    render() {
        const listElems = this.state.categorias.map((categoria) => {
            var isSelected = false;
            if (categoria.idCategoria === this.state.categoria) {
                isSelected = true;
            }
            return (
                <option value={categoria.idCategoria} selected={isSelected}>
                    {categoria.nombre}
                </option>
            );
        });
        const listaBases = this.state.basesDatos.map((base) => {
            var isSelected = false;
            if (base.id === this.state.baseDatos) {
                isSelected = true;
            }
            return (
                <option value={base.id} selected={isSelected}>
                    {base.nombre}
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
                        <p className="error-validacion">
                            {this.state.formularioErrores.titulo}
                        </p>
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
                        <select
                            id="inputState"
                            className="form-select"
                            onChange={(event) =>
                                this.setState({ categoria: event.target.value })
                            }
                        >
                            {listElems}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label for="inputState" className="form-label">
                            Base de datos de origen
                        </label>
                        <select
                            id="inputState"
                            className="form-select"
                            onChange={(event) =>
                                this.setState({ baseDatos: event.target.value })
                            }
                        >
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
                        <p className="error-validacion">
                            {this.state.formularioErrores.descripcion}
                        </p>
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
                    onClick={this.handleButtonPressed}
                >
                    Guardar Problema
                </button>
            </div>
        );
    }
}

export default EditProblemData;
