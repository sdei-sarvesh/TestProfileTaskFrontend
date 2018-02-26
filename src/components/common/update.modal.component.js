
import React from 'react';
import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
export const UpdateModal = ({ showState, handleClose, title, userName, handleNameChange, handleUpdateName }) => (
    <div className="static-modal">
        <Modal show={showState} onClick={e => handleClose(e)}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={userName}
                            placeholder="User name"
                            onChange={e => handleNameChange(e)}
                        />
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={e => handleClose(e)}>Close</Button>
                <Button bsStyle="primary" onClick={e => handleUpdateName(e)}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    </div>
)