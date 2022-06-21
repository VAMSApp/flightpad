import { useState, useEffect, } from 'react'
import {
    Modal,
    Button,
} from 'react-bootstrap'

export function PadModalDelete ({ pad, }) {
    const [visible, setVisible] = useState(false)
    
    const toggle = (override) => {
        setVisible(override || !visible)
    }

    const doSubmit = () => {
        console.log('doSubmit')
    }

    return (<>
        <Button
            variant='primary'
            onClick={toggle}
            disabled={visible}
        >
            Remove Pad
        </Button>
        <Modal show={visible} onHide={toggle}>
        <Modal.Header closeButton>
            <Modal.Title>What's your pad?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={doSubmit}>
            Remove it!
            </Button>
            <Button variant="secondary" onClick={() => toggle(false)}>
            Cancel
            </Button>
        </Modal.Footer>
        </Modal>
    </>)
}

export const PadModal = { 
    Delete: PadModalDelete
}

export default PadModal