import React from 'react'
import CreatNote from './CreatNote'
import DisplayNotes from './DisplayNotes'

const Home = () => {
    return (
        <>
            <div className="container">

                <h1 className='text-center mt-3'>ADD A NOTE</h1>
                <CreatNote />
            </div>

            <DisplayNotes />
        </>
    )
}

export default Home
