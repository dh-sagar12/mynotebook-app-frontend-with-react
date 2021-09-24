import React, { useContext, useEffect } from 'react'
import NoteContext from '../contexts/notes/noteContext'
import NoteItem from './NoteItem'


const DisplayNotes = () => {
    const noteContext = useContext(NoteContext);
    const { notes, getNotes } = noteContext

    useEffect(() => {
        getNotes()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h2 className='text-center my-3'>YOUR NOTES</h2>
            <div className="row container-fluid" style={{ marginLeft: '0' }}>
                <div className="text-center my-4 text-muted fs-3">
                    {notes.length === 0 && 'No notes to Display'}
                </div>
                {
                    notes.map((currNote, index) => {
                        return <div className="col-sm-6 col-md-4 col-xl-3  mb-3 " key={index}>
                            <NoteItem note={currNote} />
                        </div>
                    })
                }
            </div>

        </>
    )
}

export default DisplayNotes
