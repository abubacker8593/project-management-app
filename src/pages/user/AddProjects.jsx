import React, { useState } from "react";

import SideBar from "../../components/SideBar";
import NavBar from "../../components/navbar";
import { addProject } from "../../redux/features/projectslice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialForm = {
  title: "",
  description: "",
  status: "Planning",
  priority: "Medium",
  team: "",
  deadline: "a",
};

function AddProjects() {
  let navigate = useNavigate()
  const [formdata, setformdata] = useState(initialForm);

  const dispatch = useDispatch();

  function handleChange(e) {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }
const auth = useSelector((state) => state.auth);
console.log("AUTH:", auth);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
    !formdata.title.trim() ||
    !formdata.description.trim() ||
    !formdata.team.trim() ||
    !formdata.deadline
  ) {
    toast.error("Please fill in all fields");
    return;
  }

    try {
      await dispatch(addProject(formdata)).unwrap();

      toast.success("Project added successfully!");

      setformdata(initialForm);
      navigate('/Home')
      
    } catch (err) {
      toast.error(err?.message || "Failed to add project");
    }
  }
return (
    <div className="flex min-h-screen min-w-screen dark:bg-black">
      <SideBar />

      <div className="flex-1">
        <NavBar />

        <main className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5 dark:bg-zinc-900 dark:text-white">

            {/* Title */}
            <div>
              <label className="block mb-2">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formdata.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formdata.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                rows="5"
                className="w-full p-3 border rounded-lg resize-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2">
                Status
              </label>

              <select
                name="status"
                value={formdata.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-2">
                Priority
              </label>

              <select
                name="priority"
                value={formdata.priority}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Team */}
            <div>
              <label className="block mb-2">
                Team
              </label>

              <input
                type="text"
                name="team"
                value={formdata.team}
                onChange={handleChange}
                placeholder="Frontend Team"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block mb-2">
                Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formdata.deadline}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-3 bg-blue-600 text-white rounded-lg"
            >
              Add Project
            </button>

          </form>
        </main>
      </div>
    </div>
  );
}

export default AddProjects;