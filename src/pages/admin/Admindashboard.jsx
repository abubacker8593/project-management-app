import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getallusers } from "../../redux/features/adminslice";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";

function AdminDashboard() {
  let [search, setsearch] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let { user, loading } = useSelector((state) => state.admin);
  useEffect(() => {
    async function fetch() {
      let res = await dispatch(getallusers()).unwrap();
      user = res;
      console.log("Users:", user);
    }
    fetch();
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black dark:text-white">
      <NavBar />

      <main className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your application settings and users.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2
                       text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search users..."
            className="
              w-full
              pl-11 pr-4 py-3
              rounded-xl
              bg-white dark:bg-zinc-900
              text-gray-900 dark:text-white
              placeholder:text-gray-400
              border border-gray-200 dark:border-zinc-700
              outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />
        </div>
        
        <div className="mt-6 ">
          {user &&
            user
              .filter((person) =>
                person.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((person) =>
                person.role === "admin" ? null : (
                  <div
                    key={person.id}
                    className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow mb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => navigate(`/admin/users/${person.id}`)}
                  >
                    <h3 className="text-lg font-semibold">{person.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {person.email}
                    </p>
                  </div>
                ),
              )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
