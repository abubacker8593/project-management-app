import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProjectDetails() {

  const { id } = useParams();

  const { projects } = useSelector(
    (state) => state.projects
  );

  const project = projects.find(
    (project) => project.id == id
  );

  if (!project) {
    return (
      <div className="p-8">
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        {project.name}
      </h1>

      <p className="mt-2 text-gray-500">
        {project.description}
      </p>

      <div className="mt-6">
        <p>Status: {project.status}</p>
        <p>Priority: {project.priority}</p>
        <p>Deadline: {project.deadline}</p>
      </div>

    </div>
  );
}

export default ProjectDetails;