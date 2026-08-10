import React from "react";
import NavBar from "../components/navbar";
import "../index.css";
import { useSelector } from "react-redux";
import SideBar from "../components/sidebar";
import StatCard from "../components/StatCard";
import RecentProjects from "../components/RecentProjects";
function Dashboard() {
  let { dark } = useSelector((state) => state.theme);
  return (
    <div className="h-screen w-screen  dark:bg-black dark:text-white ">
      <div className="flex">
        <SideBar />

         <div className="flex-1">

          <NavBar/>

          <main className="p-8">

            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                Good morning, Abu 👋
              </h1>

              <p className="text-gray-500 mt-1">
                Here's what's happening with your projects.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">

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
    </div>
  );
}

export default Dashboard;
