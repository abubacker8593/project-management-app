import { useState } from 'react'
import { Routes,Route,Router } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './pages/Dashboard';

function App() {
  const [count, setCount] = useState('green')

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/Home' element={<Dashboard />}></Route>

    </Routes>
    <ToastContainer 
     position="top-right"
    autoClose={3000}
    theme="dark"
    />
    </>
  )
}

export default App
