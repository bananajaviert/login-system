import Swal from 'sweetalert2'


const check_email = user_email => { 

    const validate_email = email => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    }
    
    if(!validate_email(user_email)) {
        Swal.fire({
            icon: 'warning',
            text: 'Invalid email address'
        })
        return false
    }
    return true
}

const register_validate_form = (user_name, user_email, user_password) => {

    if(user_name !== null || user_email !== null || user_password !== null) {
        if(user_name !== undefined || user_email !== undefined || user_password !== undefined) {
            if(!user_name || !user_email|| !user_password) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Fill out the form to continue'
                })
                return false
            }
    
            if(user_name.length < 8) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Name should be at least 8 characters long'
                })
                return false
            }
    
            if(user_email.length < 6) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Email should be at least 6 characters long'
                })
                return false
            }
    
            if(user_password.length < 6) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Password should be at least 8 characters long'
                })
                return false
            }

            if(!check_email(user_email)) return false

            return true
        }
    }
}

const login_validate_form = (user_email, user_password) => {

    if(user_email !== null || user_password !== null) {
        if(user_email !== undefined || user_password !== undefined) {
            if(!user_email|| !user_password) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Fill out the form to continue'
                })
                return false
            }
    
            if(user_email.length < 6) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Email should be at least 6 characters long'
                })
                return false
            }
    
            if(user_password.length < 6) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Password should be at least 8 characters long'
                })
                return false
            }

            if(!check_email(user_email)) return false

            return true
        }
    }
}

export {register_validate_form, login_validate_form}