import React, {useState} from 'react'
import {BsEyeFill} from 'react-icons/bs'
import {Button, Modal} from 'react-bootstrap'
import copy from 'copy-to-clipboard';

const TokenModal = (props) => {
    const [show, setShow] = useState(false);
    const inputId = 'tokenInput' + props.object.id;

    const handleShow = () => {
        setShow(true);
        props.requestTokenSecret(props.object.id);
    }

    const handleClose = () => {
        setShow(false);
        props.cleanTokenSecret(props.object.id);
    }

    const copyToClipboard = () => {
        copy(props.object.token, {message: 'Press #{key} to copy'});
    }

    return (
        <>
            <Button size="sm"
                    variant="primary"
                    style={{marginLeft: '0.1rem', marginRight: '0.1rem'}}
                    onClick={() => handleShow()}
            >
                <BsEyeFill/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Token {props.object.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>This token is long lived and can be used to access your volumes secrets.
                        Keep it in a safe place</h6>
                    <input
                        id={inputId}
                        type="textarea"
                        value={props.object.token}
                        style={{width: '100%'}}
                        disabled={true}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={copyToClipboard}>
                        Copy to Clipboard
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TokenModal
