import React from 'react'
import "../index.css"
import { useNavigate } from 'react-router-dom';
function SideBar() {
  let navigate = useNavigate()
  return (
    <aside className="w-64 h-100vh dark:bg-zinc-900 dark:text-white p-5 rounded-r-md bg-gray-400 text-black ">
      <nav className="flex flex-col gap-2">
        <button className="text-left p-3 rounded-lg hover:bg-zinc-800" onClick={()=>{navigate("/Home")}}>
          Dashboard
        </button>

        <button className="text-left p-3 rounded-lg hover:bg-zinc-800" onClick={()=>{navigate("/Projects")}}>
          Projects
        </button>

        <button className="text-left p-3 rounded-lg hover:bg-zinc-800">
          Tasks
        </button>

        <button className="text-left p-3 rounded-lg hover:bg-zinc-800">
          Team
        </button>

        <button className="text-left p-3 rounded-lg hover:bg-zinc-800">
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default SideBar
