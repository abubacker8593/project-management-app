import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
function StatCard({ title, value, description }) {
  return (
    <div className="
      bg-white dark:bg-zinc-900
      border border-gray-200 dark:border-zinc-800
      rounded-xl
      p-6
    ">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-sm text-gray-400 mt-2">
        {description}
      </p>
    </div>
  );
}

export default StatCard;