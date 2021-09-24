import AuthContext from "./AuthContext";
import { useHistory } from 'react-router-dom'


import React, { useContext, useState } from 'react'
import AlertContext from "../alerts/AlertContext";

const AuthState = (props) => {
    const host = 'http://localhost:5000'

    //login componet related states
    const [loginStatus, setLoginStatus] = useState(false)

    const history = useHistory()


    //contexts
    const alertContext = useContext(AlertContext)
    const {showAlert} = alertContext;

    //login to the app
    const login = async (email, password) => {
        let url = `${host}/api/auth/login/`
        let credentialData = { email, password }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(credentialData)
        })
        let loginResData = await response.json()
        if (loginResData.success) {
            localStorage.setItem('token', loginResData.authtoken)
            localStorage.setItem('user', loginResData.user)
            localStorage.setItem('email', loginResData.email)
            setLoginStatus(false)
            history.push("/")
            showAlert('Login Successfully', 'success')



        }
        else {
            setLoginStatus(true)
        }
    }

    return (
        <AuthContext.Provider value={{ login, loginStatus }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
