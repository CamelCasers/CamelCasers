
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";


export default function HostFormPage() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic,setProfilePic] = useState("")
  const [location, setLocation] = useState("");

  // Get the URL parameter `:projectId` 
     
  const navigate = useNavigate();      
  const { profileId } = useParams();      // <== ADD 
  const storedToken = localStorage.getItem("authToken");                              // <== ADD
    
 // This effect will run after the initial render and each time
 // the project id coming from URL parameter `projectId` changes
  
  useEffect(() => {      
    axios
      .get(`${API_URL}/api/hosts/${profileId}`,{
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
    
  }, [profileId]);

  const handleFormSubmit = (e) => {                     // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { name, description, profilePic, location };
 
    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/hosts/${profileId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/profile/${profileId}`)
      });
  };

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
        <label>Profile Picture:</label>
        <input type="file" name="profilePic" value={profilePic} onChange={(e) => setProfilePic(e.target.value)}/>
        <br/>
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
            <label>Location:</label>
        <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
        <br/>

        <button type="submit">Update Profile</button>
      </form>

    </div>
  );
}
