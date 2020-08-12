import React, {useState} from 'react'
import {MdVpnKey} from 'react-icons/md'
import {Button, Modal} from 'react-bootstrap'

const SecretModal = (props) => {
    const [show, setShow] = useState(false);
    const [newSecret, setNewSecret] = useState('');

    const handleClose = () => {
        setShow(false);
        setNewSecret('')
    }

    const handleSave = (event) => {
        event.preventDefault()
        props.patchAction({id: props.volume.id, secret: newSecret})
        handleClose()
    }

    return (
        <>
            <Button size="sm"
                    variant="primary"
                    style={{marginLeft: '0.1rem', marginRight: '0.1rem'}}
                    onClick={() => setShow(true)}
            >
                <MdVpnKey/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.volume.name} Secret</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>Paste your new secret below</h6>
                    <input type="textarea"
                           value={newSecret}
                           onChange={(event) => setNewSecret(event.target.value)}
                           style={{width: '100%'}}
                           placeholder={'P0074v3Ry53Cr375Tr1N9h3R3...'}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SecretModal
