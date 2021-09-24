import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useContext, useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import NoteContext from '../contexts/notes/noteContext';



function UpdateNoteModal(props) {
    const context = useContext(NoteContext)
    const { editNote, showUpdateTitleErr, showUpdateDescErr } = context;
    const { note } = props
    const [UpdatedNote, SetUpdatedNote] = useState({
        title: `${note.title}`,
        description: `${note.description}`,
        tag: `${note.tag}`
    })

    const onChangeField = (e) => {
        const { name, value } = e.target
        SetUpdatedNote({ ...UpdatedNote, [name]: value })
    }


    const handleUpdateNoteBtn = async () => {
        let { title, description, tag } = UpdatedNote
        await editNote(note._id, title, description, tag)
        if (!showUpdateDescErr && !showUpdateTitleErr){
            props.onHide()
        }

    }


    return (
        <Modal
            {...props}
            size="md-down"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header  >
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Note
                </Modal.Title>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onHide}></button>

            </Modal.Header>
            <Modal.Body>
                <Form className="main_note">
                    <Form.Group className="mb-3 inputArea" controlId="exampleForm.ControlInput1">
                        <Form.Text id="tittleHelpBlock" className={`text-danger ms-4 ${!showUpdateTitleErr ? 'd-none' : ""}`}>Title Must be at least of 3 characters</Form.Text>
                        <Form.Control type="text" placeholder="Title" name='title' onChange={onChangeField} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type='text' className="inputArea" placeholder="Tags" name='tag' onChange={onChangeField} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Text id="descriptionHelpBlock" className={`text-danger ms-4 ${!showUpdateDescErr ? 'd-none' : ""}`}>Description Must be at least of 5 Characters</Form.Text>
                        <Form.Control as="textarea" className="inputArea" placeholder="Your Note" rows={3} name='description' onChange={onChangeField} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Fab className='buttonAdd' onClick={handleUpdateNoteBtn}>
                    <AddIcon className='addBtn' />
                </Fab>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateNoteModal