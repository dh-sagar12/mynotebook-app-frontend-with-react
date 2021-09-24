import React, { useContext, useRef, useState } from 'react'
import { Card } from 'react-bootstrap';
import '../css/noteItem.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import NoteContext from '../contexts/notes/noteContext'
import UpdateNoteModal from './UpdateNoteModal'




const NoteItem = (props) => {
    const { _id, title, tag, description } = props.note
    const noteContext = useContext(NoteContext);
    const [modalShow, setModalShow] = useState(false);


    const { deleteNote } = noteContext;
    const nodeRef = useRef(null)

    return (
        <>
            <UpdateNoteModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                note= {props.note}
                noderef={nodeRef}
            />
            <Card text="dark" className="mb-2 noteCard">
                <Card.Body>
                    <span className="badge bg-dark">{tag}</span>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <div className='d-flex w-100 justify-content-between'>
                        <IconButton aria-label="edit" onClick={() => setModalShow(true) } noderef={nodeRef} >
                            <EditIcon />
                        </IconButton >
                        <IconButton aria-label="edit" onClick={() => { deleteNote(_id) }}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default NoteItem
