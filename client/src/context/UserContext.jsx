import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'

const UserContext = createContext()

const UserProvider = props => {
    const [users, set_users] = useState([])

    useEffect(() => {
        const get_users = async () => {
            const res = await axios.get('/api/user')
            const data = await res.data
            set_users(data)
        }
        get_users()
    }, [])

    return (
        <UserContext.Provider value={[users, set_users]}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}