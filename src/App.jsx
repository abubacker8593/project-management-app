import { useState } from 'react'
import { Routes,Route,Router } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'


function App() {
  const [count, setCount] = useState('green')

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/SignUp' element={<SignUp />} />

    </Routes>
    </>
  )
}

export default App
