import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import ObjectsTable from "./ObjectsTable";

const ObjectModal = (props) => {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
        props.requestAction()
    }

    const handleClose = () => {
        setShow(false);
    }

    let objects = props.objects.filter((value) => props.objectFilter(value))

    return (
        <>
            <Button size="sm"
                    variant="primary"
                    style={{marginLeft: '0.1rem', marginRight: '0.1rem'}}
                    onClick={() => handleShow()}
            >
                {props.icon}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ObjectsTable
                        objectsToDisplay={objects.sort((a, b) => a.id - b.id)}
                        objectMeta={props.objectMeta}
                        deleteAction={(id) => props.deleteAction(id)}
                        deleteStatus={props.deleteStatus}
                        createAction={() => props.createAction()}
                        createStatus={props.createStatus}
                        additionalActions={props.additionalActions}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ObjectModal
