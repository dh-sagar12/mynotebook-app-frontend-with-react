import React from 'react'
import About from './components/About'
import Home from './components/Home'
import Footer from './components/Footer'
import AlertComp from './components/AlertComp'
import NavbarComp from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from './contexts/notes/NoteState';
import Login from './components/Login'
import Signup from './components/Signup'
import AuthState from './contexts/auth/AuthState'
import { AlertState } from './contexts/alerts/AlertContext'



const App = () => {

  return (
    <>
      <Router>
        <AlertState>
          <AuthState>
            <NoteState>
              <NavbarComp />
              <AlertComp/>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
              </Switch>
              <Footer />
            </NoteState>
          </AuthState>
        </AlertState>
      </Router>
    </>
  )
}

export default App

