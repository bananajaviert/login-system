import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Button, TextField} from '@material-ui/core'
import Swal from 'sweetalert2'
import '../../css/Register.css'

// Components
import MicroBlogging from '../MicroBlogging'

// Utils
import {register_validate_form} from '../../utils/validation'


const Register = ({logged, set_logged}) => {

    const [name, set_name] = useState('')
    const [email, set_email] = useState('')
    const [password, set_password] = useState('')

    const add_new_request = async user => {
        set_logged(true)
        try {
            const res = await axios.post('/api/user/register', user)
            const data = await res.data

            Swal.fire({
                icon: 'success',
                text: `${data}`,
                confirmButtonText: 'Continue'
            }).then(result => {
                if(result.isConfirmed) {
                    return window.location = '/login'
                }
            })

            set_name('')
            set_email('')
            set_password('')

        } catch(error) {
            Swal.fire({
                icon: 'error',
                text: error.response.data
            })
        }
        set_logged(false)
    }

    const submit_form = e => {
        e.preventDefault()

        if(!register_validate_form(name, email, password)) return

        add_new_request({name, email, password})
    }

    return (
        <div className='register-container'>
            <MicroBlogging/>
            <form className='register-form' onSubmit={submit_form}>
                <h2>Register</h2>
                    <div className='input-field'>
                        <TextField onChange={e => set_name(e.target.value)}
                        value={name}
                        type="text"
                        placeholder='Enter your full name'
                        label='Name'/>

                        <TextField onChange={e => set_email(e.target.value)}
                        value={email}
                        type="email"
                        placeholder='Enter valid email'
                        label='Email'/>

                        <TextField onChange={e => set_password(e.target.value)}
                        value={password}
                        type="password"
                        placeholder='Password'
                        label='Password'/>

                    </div>
                <Button variant='contained' color='primary' type='submit' className='btn' disabled={logged ? true : false}>
                    {logged ? 'Loading...' : 'Create Account'}
                </Button>
                <p>Already have an account? 
                    <Link to='/login' className='link'>Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
