import React from "react";

class ListaUsuarios extends React.Component{

    render(){
        return (
            <div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
                    <h1> Usuarios Existentes </h1>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Usuario</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">alexia_oficial</th>
                                <td>Alexia Martinez</td>
                                
                                <td>
                                    <button type="button" class="btn btn-warning"><i class="far fa-eye"></i> Modificar</button>
                                    <button type="button" class="btn btn-danger"><i class="fas fa-edit"></i>Eliminar</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">andros</th>
                                <td>Andres Gutierrez</td>
                                
                                <td>
                                    <button type="button" class="btn btn-warning"><i class="far fa-eye"></i> Modificar</button>
                                    <button type="button" class="btn btn-danger"><i class="fas fa-edit"></i>Eliminar</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">mike</th>
                                <td>Miguel Moreno</td>
                                
                                <td>
                                    <button type="button" class="btn btn-warning"><i class="far fa-eye"></i> Modificar</button>
                                    <button type="button" class="btn btn-danger"><i class="fas fa-edit"></i>Eliminar</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListaUsuarios;