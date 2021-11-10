import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Editor from "../components/Editor";

class ModalCodigoFuente extends React.Component {
    //cierra el modal
    handleClose = () => {
        this.props.handleClose();
    };

    setSQL = (value) => {};

    render() {
        var editor = null;

        if (this.props.show === true) {
            editor = <Editor value={this.props.sql} onChange={this.setSQL} />;
        } else {
            editor = null;
        }

        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.handleClose}
                    size="xl"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Codigo Fuente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <b>Problema:</b> {this.props.problema}
                        </p>
                        <p>
                            <b>ID Problema:</b> {this.props.id}
                        </p>
                        <div>{editor}</div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModalCodigoFuente;
