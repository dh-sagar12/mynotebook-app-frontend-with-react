import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';



const Footer = ()=>{
    let year = new Date().getFullYear()
    return (
        <>
            <footer className='text-center'>
                <p>Copyright © {year} </p>
            </footer>
        </>
    )
}

export default Footer