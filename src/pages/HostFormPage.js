import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUpload from "../components/CloudinaryUpload";



export default function HostFormPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [location, setLocation] = useState("");

  // Get the URL parameter `:projectId`

  const navigate = useNavigate();
  const { profileId } = useParams(); // <== ADD
  const storedToken = localStorage.getItem("authToken"); // <== ADD

  // This effect will run after the initial render and each time
  // the project id coming from URL parameter `projectId` changes

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/hosts/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const host = response.data;
        setName(host.name);
        setDescription(host.description);
        setLocation(host.location);
        setProfilePic(host.profilePic);
      })
      .catch((error) => console.log(error));
  }, [profileId]);

  const handleFormSubmit = (e) => {
    // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { name, description, profilePic, location };

    // Make a PUT request to update the project
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/hosts/${profileId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/profileHost/${profileId}`);
      });
  };

  function imgUpload(url) {
    if (url) {
      setProfilePic(url);
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Host name:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Description:</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Location:</label>
          <div className="col-sm-10">
          <input
          className="form-control"
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label for="formFile" className="form-label"> Your Profile Picture: </label>
          <CloudinaryUpload  
          className="form-control form-control-sm" 
          type="file" id="formFile" 
          imgUpload={imgUpload} 
          images={profilePic} />
        </div>

        <button className="btn btn-secondary" type="submit">Update Profile</button>
      </form>
    </div>
  );
}
