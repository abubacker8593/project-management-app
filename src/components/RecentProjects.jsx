import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import "../index.css";
import { useNavigate } from "react-router-dom";

function RecentProjects() {
  let dispatch = useDispatch();
  let navigate = useNavigate()
  let { isloading, error, projects } = useSelector((state) => state.projects);

  return (
    <div className="dark:bg-zinc-900 p-4 mt-7 rounded-md dark:border dark:border-white border-2">
      <div className="flex justify-between px-6">
        <h1 className="text-2xl font-bold">Recent Project</h1>
        <div className="flex justify-center items-center gap-2 hover:text-gray-500 cursor-pointer" onClick={()=>navigate("/Projects")}>
          View all
          <FaArrowRight className="size-3" />
        </div>
      </div>
      <div className="dark:bg-zinc-900 px-6 py-6 ">
        <div className="flex bg--700 justify-between px-1 items-center text-[20px] font-serif">
          <div>Project</div>
          <div>Status</div>
        </div>
        <div className="mt-3">
          {projects.map((project) => {
            return (
              <div className="flex justify-between mb-3 hover:bg-zinc-800" key={project.id}>
                <h1 className="dark:text-gray-300 hover:text-white">{project.title}</h1>
                {project.status == "Completed" ? (
                  <span className="text-green-500 font-mono text-left">
                    completed
                  </span>
                ) : (
                  <span className="text-yellow-500 font-mono text-left">
                    In Progress
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default RecentProjects;
