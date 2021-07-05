import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'

import {UserContext} from '../context/UserContext'

const token = localStorage.getItem('auth-token')

const Home = () => {
    const [users, set_users] = useContext(UserContext)
    const [message, set_message] = useState([])

    useEffect(() => {
        const home_direct = async () => {
            const res = await axios.get('/api/page/home', {
                headers: {
                    'auth-token': token
                }
            })
            const data = await res.data
            set_message(data)
        }

        home_direct()
    }, [])

    return (
        <div>
            <div>
                <h1>{message}</h1>
            </div>
        </div>
    )
}

export default Home
