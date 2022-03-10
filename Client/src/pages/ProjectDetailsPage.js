// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

const API_URL = "http://localhost:5005"; 

function ProjectDetailsPage (props) {
  const [project, setProject] = useState(null);

  //Get the URL paramenter `:projectId`
  const { projectId } = useParams();

  //helper function
  const getProject = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
   
    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProject()
  }, []);

  
  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>Project: {project.title}</h1>
          <p>Description: {project.description}</p>
        </>
      )}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>

      <AddTask refreshProject={getProject} projectId={projectId} />

      {project && project.tasks.map((task) => (
          <TaskCard key={task._id} {...task} />
      ))}

      
    </div>
  );
}

export default ProjectDetailsPage;
