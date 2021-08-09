import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { database } from '../../firebase'
import {useAuth} from '../../context/AuthContext'
import {ROOT_FOLDER} from '../hooks/useFolder'


export default function AddFolderButton({currentFolder}) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const { currentUser } = useAuth()
    function openModal(){
        setOpen(true)
    }

    function closeModal(){
        setOpen(false)
    }

    function handleSubmit(event){
        event.preventDefault()

        if(currentFolder == null) return 

        const path = [...currentFolder.path]
        if(currentFolder !== ROOT_FOLDER){
            path.push({name: currentFolder.name, id: currentFolder.id})
        }

        database.folders.add({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimestamp()
        })
        setName('')
        closeModal()
    }

    return (
        <>
        <Button onClick={() => openModal()} variant="outline-success" size="sm">
            <FontAwesomeIcon icon={faFolderPlus} />
        </Button>
        <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>
                            Folder name
                        </Form.Label>
                        <Form.Control
                        type="text"
                        required
                        value={name}
                        onChange={event => setName(event.target.value)}
                         />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="success" type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}