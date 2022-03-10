
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";


export default function HostForm() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Get the URL parameter `:projectId` 
  const { projectId } = useParams();      
  const navigate = useNavigate();            // <== ADD 
    

 // This effect will run after the initial render and each time
 // the project id coming from URL parameter `projectId` changes
  
  useEffect(() => {      
    const storedToken = localStorage.getItem("authToken");                            // <== ADD
    axios
      .get(`${API_URL}/api/projects/${projectId}`,{
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const host = response.data;
        setName(host.title);
        setDescription(host.description);

      })
      .catch((error) => console.log(error));
    
  }, [projectId]);

  const handleFormSubmit = (e) => {                     // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { name, description };
 
    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/hosts/${projectId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/host/${projectId}`)
      });
  };

  const deleteProject = () => {
    axios
    .delete(`${API_URL}/api/projects/${projectId}`)
    .then(()=>{
      //Once the delete request is resvolved succesfully 
      // navigate back to the list of projects
      navigate("/projects");
    })
    .catch((err)=> console.log(err));

  }

  return (
    
    <div className="EditProjectPage">
      <h3>Edit your Host Profile</h3>

      <form onSubmit={handleFormSubmit}>
        <label>name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Profile</button>
      </form>
         
         <button onClick={deleteProject}>Delete</button>


    </div>
  );
}
