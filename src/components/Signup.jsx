import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import AlertContext from '../contexts/alerts/AlertContext';



const Signup = () => {
    const context = useContext(AlertContext)
    const {showAlert} = context;

    const history = useHistory();
    // const { login, loginStatus } = context;
    const [credentials, setCredentials] = useState({
        name: "",
        email: '',
        password: '',
        cpassword: ""
    })
    let errorShowObj = {
        name: false,
        email: false,
        cpassword: false,
        password: false,

    }
    const [showValidateErr, setShowValidateErr] = useState(errorShowObj)
    const [showResponseErr, setShowResponseErr] = useState({
        err: false,
        msg: ""
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setCredentials({ ...credentials, [name]: value })
    }

    const createUser = async (name, email, password, cpassword) => {
        let url = "http://localhost:5000/api/auth/createuser/"
        let credentialData = { name, email, password, cpassword }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(credentialData)
        })
        let resData = await response.json()
        if (!resData.success) {
            if (resData.errors) {
                resData.errors.forEach(element => {
                    errorShowObj = { ...errorShowObj, [element.param]: true }
                    setShowValidateErr(errorShowObj)
                });
            }
            if (resData.error) {
                setShowResponseErr({ err: true, msg: resData.error })
            }

        }
        else {

            localStorage.setItem('token', resData.authtoken)
            localStorage.setItem('user', resData.user)
            localStorage.setItem('email', resData.email)
            setShowValidateErr({
                name: false,
                email: false,
                cpassword: false,
                password: false,

            })
            history.push('/')
            showAlert('Signed Up Successfully', 'success');
         
        }


    }

    const onSubmit = (e) => {
        e.preventDefault()
        let { name, email, password, cpassword } = credentials
        createUser(name, email, password, cpassword)

    }
    return (

        <>
            <div className="Login m-4">
                <Form className='border-shadow' onSubmit={onSubmit}>
                    <h2 className="text-center py-2 bg-warning">SIGN UP <i className="fas fa-user mx-1"></i> </h2>
                    <div className="p-4">
                        <div className={`border border-danger p-2 text-center text-danger rounded mb-3 ${!showResponseErr.err ? 'd-none' : ""}`}>{showResponseErr.msg}</div>
                        <Form.Group size="lg" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                name='name'
                                onChange={onChangeHandler}
                                value={credentials.name}
                            />
                            <Form.Text className={`text-danger ${!showValidateErr.name ? 'd-none' : ""}`}>
                                *Name should be at least three characters
                            </Form.Text>
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                autoComplete='email'
                                name="email"
                                onChange={onChangeHandler}
                                value={credentials.email}

                            />
                            <Form.Text className={`text-danger ${!showValidateErr.email ? 'd-none' : ""}`}>
                                *Please Enter Valid Email.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                type="password"
                                autoComplete='new-password'
                                name="password"
                                onChange={onChangeHandler}
                                value={credentials.password}

                            />
                            <Form.Text className={`text-danger ${!showValidateErr.password ? 'd-none' : ""}`}>
                                *Password must be atleast Five Characters long
                            </Form.Text>
                        </Form.Group>
                        <Form.Group size="lg" controlId="cpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                autoComplete='new-password'
                                name="cpassword"
                                onChange={onChangeHandler}
                                value={credentials.cpassword}

                            />
                            <Form.Text className={`text-danger ${!showValidateErr.cpassword ? 'd-none' : ""}`}>
                                *Both password and confirm password should be same
                            </Form.Text>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant='outline-dark' block size="lg" className='my-3 ' type="submit">
                                <i className="fas fa-user-plus"></i>
                            </Button>
                        </div>
                    </div>

                </Form>
            </div>
        </>
    )
}

export default Signup
