import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Button, TextField, Typography} from '@material-ui/core'
import Swal from 'sweetalert2'

import '../../css/Login.css'

// Utils
import {login_validate_form} from '../../utils/validation'

const Login = ({logged, set_logged}) => {
    const [email, set_email] = useState('')
    const [password, set_password] = useState('')

    const add_new_request = async user => {
        set_logged(true)
        try {
            const res = await axios.post('/api/user/login', user)
            const data = await res.data
            localStorage.setItem('auth-token', data.token)

            Swal.fire({
                icon: 'success',
                text: `${data.message}`,
                confirmButtonText: 'Continue',
                allowOutsideClick: false,
            }).then(result => {
                if(result.isConfirmed) {
                    return window.location = '/home'
                }
            })
            
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

        if(!login_validate_form(email, password)) return

        add_new_request({email, password})
    }
    
    return (
        <form className='login-form' onSubmit={submit_form}>
            <Typography variant='h3' className='login-txt'>Log in</Typography>
                <div className='input-field'>

                    <TextField onChange={e => set_email(e.target.value)}
                        value={email}
                        type="email"
                        placeholder='Enter valid email'
                        label='Email'
                    />

                    <TextField onChange={e => set_password(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='Password'
                    label='Password'/>

                </div>
            <Button 
                variant='contained' 
                color='primary'
                type='submit'
                className='btn' 
                disabled={logged ? true : false}
            >
                {logged ? 'Logging in' : 'Log In'}
            </Button>
            <Typography className='register-link'>Don't have an account?
                <Link to='/' className='link'>Register</Link>
            </Typography>
        </form>
    )
}

export default Login
