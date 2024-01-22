// eslint-disable-next-line no-unused-vars
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Netflix from './Pages/Netflix'
import Player from './Pages/Player'
function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/Signup' element={<Signup />} />
          <Route exact path='/Player' element={<Player />} />
          <Route exact path='/' element={<Netflix />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App