import React, { useEffect } from "react";
import NavBar from "../../components/navbar";

import { useSelector ,useDispatch } from "react-redux";
import StatCard from "../../components/StatCard";
import RecentProjects from "../../components/RecentProjects";
import SideBar from "../../components/SideBar";
import { fetchProjects } from "../../redux/features/projectslice";
import { fetchtasks } from "../../redux/features/taskslice";
import { useNavigate } from "react-router-dom";
// import bg from "../assets/bg.jpg"
function Dashboard() {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let { user } = useSelector((state) => state.auth);
  let { dark } = useSelector((state) => state.theme);
  useEffect(()=>{
    dispatch(fetchProjects())
    dispatch(fetchtasks())
  },[dispatch])
  const isAuthenticated = useSelector(
  (state) => state.auth.isAuthenticated
);

if (!isAuthenticated) {
   return navigate("/Login")
}
  return (
    <div className="min-h-screen w-screen  dark:bg-black dark:text-white text-cyan-950 flex">
      
        <SideBar />

         <div className="flex-1">

          <NavBar/>

          <main className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                Good morning, {user?.name} 👋
              </h1>

              <p className="text-gray-500 mt-1">
                Here's what's happening with your projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">

              <StatCard
                title="Total Projects"
                value="8"
                description="2 currently active"
              />

              <StatCard
                title="Total Tasks"
                value="24"
                description="8 tasks remaining"
              />

              <StatCard
                title="Completed Tasks"
                value="12"
                description="50% completion rate"
              />

            </div>

            <RecentProjects />

          </main>

        
      </div>
    </div>
  );
}

export default Dashboard;
