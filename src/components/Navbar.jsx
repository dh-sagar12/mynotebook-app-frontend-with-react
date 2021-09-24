import React, {useRef } from 'react'
import { Container, Navbar, Nav, Image } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import logo from "../images/logo.png"
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';



const NavbarComp = () => {
    let location = useLocation();
    let history = useHistory()
    const handleSignOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('email')
        history.push('/login')

    }

    const ref = useRef()


    const handleRef = () => {
        ref.current.click()
    }

    

    return (
        <div>
            <Navbar bg="warning" variant="light">
                <Container >
                    <Navbar.Brand>
                        <Link to='/'>
                            <Image src={logo} height="40" width="40" />
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className={`nav-link fw-bold ${location.pathname === '/' ? "active" : ""}`} to="/">
                            HOME
                        </Link>
                        <Link className={`nav-link fw-bold ${location.pathname === '/about' ? "active" : ""}`} to="/about">
                            ABOUT
                        </Link>
                    </Nav>

                    {!localStorage.getItem('token') ?
                        <>
                            <Tooltip title="Log In" arrow>
                                <IconButton aria-label="login">
                                    <Link className="text-dark" to="/login" >
                                        <i className="fas fa-sign-in-alt"></i>
                                    </Link>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Sign Up" arrow >
                                <IconButton aria-label="signup">
                                    <Link className='text-dark ' to="/signup">
                                        <i className="fas fa-user-plus"></i>
                                    </Link>
                                </IconButton>
                            </Tooltip>
                        </>
                        :
                        <>

                            <Dropdown>
                                <DropdownToggle className="d-none" ref={ref}>

                                </DropdownToggle>
                                <Tooltip title={`Hello ${localStorage.getItem('user')}`} placement="left" arrow >
                                    <IconButton className='text-dark' onClick={handleRef}>
                                        <i className="far fa-user-circle fs-1"></i>
                                    </IconButton>

                                </Tooltip>
                                <Dropdown.Menu style={{ right: '0.4rem', padding: '13px'}}>
                                    <h4 className='text-center'>{localStorage.getItem('user')}</h4>
                                    <p className="text-center text-muted">{localStorage.getItem('email')}</p>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        <Link className='text-dark nav-link' to='/login' onClick={handleSignOut}>
                                            <h5>
                                                <i className="fas fa-sign-out-alt me-1" />
                                                Sign Out
                                            </h5>
                                        </Link>

                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </>
                    }

                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComp
