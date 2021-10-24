import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalDeleteUser extends React.Component{

    //cierra el modal
    handleClose = () => {
        this.props.handleClose();
    }

    render(){
        return(
            <div>
                    <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Eliminar Usuario </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Estas seguro de que quieres eliminar a {this.props.nombre}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>Cancelar</Button>
                        
                        <Button 
                            variant="primary" 
                            onClick= { () => this.props.deleteUser(this.props.id) }
                        >
                            Eliminar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>

        );
    }

}

export default ModalDeleteUser;