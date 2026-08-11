import React from 'react'
import { FaUser , FaMoon } from 'react-icons/fa'
import { User ,Moon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import themeReducer, { toggleTheme } from '../redux/features/themeslice'
function NavBar() {
  let dispatch = useDispatch()

  
  return (
    <div className='flex justify-between items-center px-[6%] py-[3%] bg-white-200 dark:bg-black dark:text-white text-black'>
      <h1 className='text-2xl font-medium dark:text-white text-cyan-950'> DashBoard</h1>
      
      <div className='flex gap-5 mr-[8%] sm:mr-[]'>
        <button className='cursor-pointer '><User /></button>
        <button  onClick={()=>{dispatch(toggleTheme())}} className='cursor-pointer'><Moon /></button>
      </div>
      
    </div>
  )
}

export default NavBar
