import React from 'react'
import microImage from '../img/microblogging.png'

import '../css/MicroBlogging.css'

const MicroBlogging = () => {
    return (
        <div className='micro-blg'>
            <h3>Create an account and start interacting with people online!</h3>
            <img src={microImage} alt="Communicate"/>
            <h5>Micro-blogging app for everyone!</h5>
        </div>
    )
}

export default MicroBlogging
