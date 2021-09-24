import React, { useContext, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import '../css/createNotes.css'
import Fab from '@material-ui/core/Fab';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import NoteContext from '../contexts/notes/noteContext';


const CreatNote = (props) => {
    const context = useContext(NoteContext)
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ''
    })
    const { addNote, showTitleErr, showDescErr, titleErr, descErr } = context; 

    const onChangeField = (e) => {
        const { name, value } = e.target
        setNote({ ...note, [name]: value })
    }

    const handleAddNoteBtn = () => {
        let { title, description, tag } = note
        addNote(title, description, tag)
        setNote({
            title: "",
            description: "",
            tag: ''
        })

    }



    return (

        <>
            <Form className="mt-3 p-2 border-shadow main_note">
                <Form.Group className="mb-3 inputArea" controlId="exampleForm.ControlInput1">
                    <Form.Text id="tittleHelpBlock" className={`text-danger ms-4 ${!showTitleErr?'d-none':""}`}>*{titleErr}</Form.Text>
                    <Form.Control type="text" placeholder="Title" name='title' value={note.title} onChange={onChangeField} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type='text' className="inputArea" placeholder="Tags" name='tag' value={note.tag} onChange={onChangeField} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Text id="descriptionHelpBlock" className={`text-danger ms-4 ${!showDescErr?'d-none':""}`}>*{descErr}</Form.Text>
                    <Form.Control as="textarea" className="inputArea" placeholder="Your Note" rows={3} name='description' value={note.description} onChange={onChangeField} />
                </Form.Group>
                <div className="d-flex addBtn">
                    <Fab className='buttonAdd' onClick={handleAddNoteBtn}>
                        <AddIcon className='addBtn' />
                    </Fab>
                </div>
            </Form>
        </>
    )
}

export default CreatNote