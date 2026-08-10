import React from 'react'
import { FaUser , FaMoon } from 'react-icons/fa'
import { User ,Moon } from 'lucide-react'

function NavBar() {
  
  return (
    <div className='flex justify-between items-center px-[6%] py-[3%] bg-amber-200'>
      <h1> DashBoard</h1>
      
      <div className='flex gap-5 mr-[8%] sm:mr-[5%]'>
        <div className='' ><User /></div>
        <div><Moon /></div>

      </div>
      
    </div>
  )
}

export default NavBar
