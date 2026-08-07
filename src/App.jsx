import { useState } from 'react'
import { Routes,Route,Router } from 'react-router-dom'


function App() {
  const [count, setCount] = useState('green')

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    </>
  )
}

export default App
