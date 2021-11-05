import React from "react";
import ListaProblemas from "./ListaProblemas";
import withAuthGeneral from "./Auth/withAuthGeneral.js";
import axios from "axios";

class Problemset extends React.Component {
    state = {
        problems: [],
        categorias: [],
        categoriasSeleccionadas: [],
        btnCategoria: [],
        selectedOption: -1,
        ordenarPor: "dificultad",
        acendente: false,
    };

    dicCategorias = {};

    componentDidMount() {
        this.cargarCategorias();
        this.handleChangeSort("resueltos");
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
        var datos = [];
        datos = respuesta.data;
        datos.forEach((element) => {
            this.dicCategorias[element.idCategoria] = element.nombre;
        });
        this.setState({ categorias: respuesta.data });
    };

    cargarProblemas = async (arr_categorias, ordenarPor, ascendente) => {
        const token = sessionStorage.getItem("token");
        const tmp_token = "Bearer " + token;
        const respuesta = await axios.post(
            "/api/Problemas/listaProblemas",
            {
                categorias: arr_categorias,
                ordenaPor: ordenarPor,
                ascendente: ascendente,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tmp_token,
                },
            }
        );
        this.setState({ problems: respuesta.data });
    };

    handleSelectCategoria = (event) => {
        const idCategoria = event.target.value;
        const nombre = this.dicCategorias[idCategoria];

        console.log(this.dicCategorias);

        var arr = this.state.categoriasSeleccionadas;
        var arrBtn = this.state.btnCategoria;

        if (arr.includes(idCategoria)) {
        } else {
            arr.push(idCategoria);
            arrBtn.push({
                id: idCategoria,
                nombre: nombre,
            });
            this.setState({
                categoriasSeleccionadas: arr,
                btnCategoria: arrBtn,
            });
        }

        this.cargarProblemas(
            this.state.categoriasSeleccionadas,
            this.state.ordenarPor,
            this.state.acendente
        );
    };

    handleRemoveCategoria = (id) => {
        var idCategoriaSeleccionar = -1;
        var idBtnCategoria = -1;
        for (var i = 0; i < this.state.categoriasSeleccionadas.length; i++) {
            if (id === this.state.categoriasSeleccionadas[i]) {
                idCategoriaSeleccionar = i;
                break;
            }
        }

        for (var i = 0; i < this.state.btnCategoria.length; i++) {
            if (id === this.state.btnCategoria[i].id) {
                idBtnCategoria = i;
                break;
            }
        }

        var tmp_arr = this.state.categoriasSeleccionadas;
        var tmp_arr_btn = this.state.btnCategoria;

        tmp_arr.splice(idCategoriaSeleccionar, 1);
        tmp_arr_btn.splice(idBtnCategoria, 1);

        this.setState({
            categoriasSeleccionadas: tmp_arr,
            btnCategoria: tmp_arr_btn,
        });

        this.handleLoadProblems(this.state.ordenarPor, this.state.acendente);
    };

    handleChangeSort = (ordenarPor) => {
        var ascendente = !this.state.acendente;
        this.handleLoadProblems(ordenarPor, ascendente);
        this.setState({
            acendente: ascendente,
            ordenarPor: ordenarPor,
        });
    };

    handleLoadProblems = (ordenarPor, ascendente) => {
        if (this.state.categoriasSeleccionadas.length === 0) {
            this.cargarProblemas([0], ordenarPor, ascendente);
        } else {
            this.cargarProblemas(
                this.state.categoriasSeleccionadas,
                ordenarPor,
                ascendente
            );
        }
    };

    render() {
        const opcionesCategorias = this.state.categorias.map((categoria) => {
            return (
                <option value={categoria.idCategoria}>
                    {categoria.nombre}
                </option>
            );
        });

        const buttonsCategorias = this.state.btnCategoria.map((categoria) => {
            return (
                <button
                    className="btn btn-primary"
                    onClick={() => this.handleRemoveCategoria(categoria.id)}
                >
                    {categoria.nombre} X
                </button>
            );
        });

        return (
            <div>
                <div class="col-md-3">
                    <label for="inputState" class="form-label">
                        Filtrar por
                    </label>
                    <select
                        id="inputState"
                        class="form-select form-select-primary"
                        onChange={this.handleSelectCategoria}
                        value={this.state.selectedOption}
                    >
                        <option value={-1}>Seleccionar Categoria</option>
                        {opcionesCategorias}
                    </select>
                </div>
                <div style={{ marginTop: "1rem" }}>{buttonsCategorias}</div>
                <ListaProblemas
                    problems={this.state.problems}
                    handleChangeSort={this.handleChangeSort}
                />
            </div>
        );
    }
}

export default withAuthGeneral( Problemset );