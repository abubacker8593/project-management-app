import React from 'react'
import "../index.css"
function SideBar() {
  return (
    <aside className="w-64 h-100vh dark:bg-zinc-900 dark:text-white p-5 rounded-r-md bg-white">
      <nav className="flex flex-col gap-2">
        <button className="text-left p-3 rounded-lg hover:bg-zinc-800">
          Dashboard
        </button>

        <button className="text-left p-3 rounded-lg hover:bg-zinc-800">
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
