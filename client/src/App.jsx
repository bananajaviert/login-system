import React, {useState} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './css/style.css'

// Components
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Home from './components/Home'

// State providers
import {UserProvider} from './context/UserContext'

function App() {
  const [logged, set_logged] = useState(false)
  
    return (
    <Router>
      <div className="App">
        <UserProvider>
        <Route exact path='/' render={props => (
              <Register {...props} logged={logged} set_logged={set_logged}/>
        )}/>

        <Route path='/login' render={props => (
          <Login {...props} logged={logged}
          set_logged={set_logged}/>
        )}/>

        <Route path='/home' render={props => (
          <Home {...props} logged={logged} set_logged={set_logged}/>
        )}/>
        </UserProvider>
      </div>
    </Router>
  )
}

export default App
