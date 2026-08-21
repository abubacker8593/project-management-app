import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

import SideBar from "../../components/SideBar";
import NavBar from "../../components/navbar";
import { deleteProject, fetchProjects } from "../../redux/features/projectslice";
import { Outlet, useNavigate } from "react-router-dom";

function Projects() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { projects, isloading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="flex-1">
        <NavBar />

        <main className="p-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>

              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage and track your projects.
              </p>
            </div>

            {/* Add Project */}
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg
              bg-blue-600 text-white
              hover:bg-blue-700 transition"
              onClick={() => {
                navigate("/AddProjects");
              }}
            >
              <FaPlus className="text-sm" />
              Add Project
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <FaSearch
              className="absolute left-4 top-1/2
              -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-11 pr-4 py-3 rounded-lg
              border border-gray-200
              dark:border-zinc-700
              bg-white dark:bg-zinc-900
              outline-none
              focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Projects container */}
          <div
            className="rounded-xl border
            border-gray-200 dark:border-zinc-800
            bg-white dark:bg-zinc-900
            overflow-hidden"
          >
            <Outlet />
            {/* Table Header */}
            <div
              className="grid grid-cols-12
              px-6 py-4
              bg-gray-50 dark:bg-zinc-800
              text-sm font-medium
              text-gray-500 dark:text-gray-400"
            >
              <div className="col-span-5">Project</div>

              <div className="col-span-2">Status</div>

              <div className="col-span-2">Priority</div>

              <div className="col-span-2">Deadline</div>

              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Loading */}
            {isloading && (
              <div className="p-8 text-center">Loading projects...</div>
            )}

            {/* Error */}
            {error && (
              <div className="p-8 text-center text-red-500">{error}</div>
            )}

            {/* Projects */}
            {!isloading &&
              !error &&
              projects.map((project) => (
                <div
                  key={project.id}
                  className="grid grid-cols-12
                items-center
                px-6 py-5
                border-t border-gray-200
                dark:border-zinc-800
                hover:bg-gray-50
                dark:hover:bg-zinc-800/50
                transition"
                  onClick={() => {
                    navigate(`/Projects/${project.id}`);
                  }}
                >
                  <div className="col-span-5">
                    <h2 className="font-medium">{project.title}</h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {project.description}
                    </p>
                  </div>

                  <div className="col-span-2">
                    {project.status === "Completed" ? (
                      <span className="text-sm text-green-500">
                        ● Completed
                      </span>
                    ) : (
                      <span className="text-sm text-yellow-500">
                        ● In Progress
                      </span>
                    )}
                  </div>

                  {/* Priority */}
                  <div className="col-span-2">
                    <span className="text-sm">{project.priority}</span>
                  </div>

                  {/* Deadline */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {project.deadline}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-3">
                    <button className="text-gray-500 hover:text-blue-500 transition">
                      <FaEdit />
                    </button>

                    <button
                      className="text-gray-500 hover:text-red-500 transition"
                      onClick={() => {
                        dispatch(deleteProject(project.id));
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Projects;
