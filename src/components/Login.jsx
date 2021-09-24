import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/Login.css'
// import NoteContext from '../contexts/notes/noteContext';
import AuthContext from '../contexts/auth/AuthContext';



const Login = () => {

    const context = useContext(AuthContext)
    const { login, loginStatus } = context;
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setCredentials({ ...credentials, [name]: value })
    }


    const onSubmit = (e) => {
        e.preventDefault()
        const { email, password } = credentials
        login(email, password)
        

    }
    return (
        <>
            <div className="Login m-4">
                <Form className='border-shadow' onSubmit={onSubmit}>
                    <h2 className="text-center bg-warning py-2">
                        LOG IN <i className="fas fa-key mx-1"></i> </h2>
                    <div className="p-4">
                        <div className={`border border-danger text-danger p-2 text-center mb-3 ${!loginStatus?'d-none': "" }`}>Invalid Credentials</div>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                name="email"
                                onChange={onChangeHandler}
                                value={credentials.email}
                                required
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='password'
                                onChange={onChangeHandler}
                                value={credentials.password}
                                required

                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant='outline-dark' block size="lg" className='my-3 ' type="submit">
                                <i className="fas fa-sign-in-alt"></i>
                            </Button>
                        </div>
                    </div>

                </Form>
            </div>

        </>
    )
}

export default Login
