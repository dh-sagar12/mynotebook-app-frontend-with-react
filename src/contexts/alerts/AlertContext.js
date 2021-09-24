import React from 'react'
import { createContext, useState } from "react";

const AlertContext = createContext()


const AlertState = (props) => {

    const [alert, setAlert] = useState(null)

    let showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500);
    }
    return (
        <AlertContext.Provider value={{alert, showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}


export { AlertState };
export default AlertContext