import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import AlertContext from '../alerts/AlertContext';
import NoteContext from './noteContext';




const NoteState = (props) => {
  const host = 'http://localhost:5000'
  let notesInitials = []


  // fetch notes component realted hooks 
  const [notes, setNotes] = useState(notesInitials)



  // create notes component related hooks
  const [showTitleErr, setshowTitleErr] = useState(false)
  const [showDescErr, setShowDescErr] = useState(false)
  const [titleErr, setTitleErr] = useState("")
  const [descErr, setDescErr] = useState("")


  // updateNote component related hooks 
  const [showUpdateTitleErr, setShowUpdateTitleErr] = useState(false)
  const [showUpdateDescErr, setShowUpdateDescErr] = useState(false);

  //context
  const alertContext = useContext(AlertContext)
  const {showAlert} = alertContext;


  let history = useHistory()

  //Fetch Notes From database
  const getNotes = async () => {

    let url = `${host}/api/notes/fetchnotes/`
    if (localStorage.getItem('token')){
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const dataReceived = await response.json()
      setNotes(dataReceived)
    }
    else{

      history.push('/login')
    }
    
  }

  //Add a note
  const addNote = async (title, description, tag) => {

    let note1 = {
      "title": title,
      "description": description,
      "tag": tag
    }

    let note2 = {
      "title": title,
      "description": description
    }
    let url = `${host}/api/notes/createnote/`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: tag !== "" ? JSON.stringify(note1) : JSON.stringify(note2)
    });
    let resData = await response.json()

    if (resData.errors) {
      resData.errors.forEach(element => {
        if (element.param === 'title') {
          setshowTitleErr(true)
          setTitleErr(element.msg)
        }
        else if (element.param === 'description') {
          setShowDescErr(true)
          setDescErr(element.msg)
        }
      });
    }
    else {
      setshowTitleErr(false)
      setShowDescErr(false)
      getNotes()
      // setNotes(notes.concat())
      showAlert('Your Note Has Been Added Successfully', 'success')

    }
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    let url = `${host}/api/notes/updatenotes/${id}/`
    // http://localhost:5000/api/notes/updatenotes/613794d311b35a4179eedcff/    
    let updatedNote = { title, description, tag }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(updatedNote)
    });
    let resData = await response.json()
    if (resData.errors) {
      resData.errors.forEach(element => {
        if (element.param === 'title') {
          setShowUpdateTitleErr(true)
        }
        else if (element.param === 'description') {
          setShowUpdateDescErr(true)
        }
      });
    } else {
      setShowUpdateTitleErr(false)
      setShowUpdateDescErr(false)
      notes.forEach(element => {
        if (element._id === id) {
          element.title = title
          element.description = description
          element.tag = tag
        }
      });
      setNotes(notes)
    }

  }
  //Delete a Note
  const deleteNote = async (id) => {
    let url = `${host}/api/notes/deletenote/${id}/`
    // http://localhost:5000/api/notes/deletenote/613794b911b35a4179eedcf9/
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    let resData = await response.json()
    console.log(resData);
    setNotes(notes.filter((note) => {
      return note._id !== id
    }))
  }




  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes, showTitleErr, showDescErr, titleErr, descErr, showUpdateTitleErr, showUpdateDescErr }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
