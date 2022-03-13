import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUpload from "../components/CloudinaryUpload";

const API_URL = "http://localhost:5005";

export default function ArtistFormPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [videos, setVideos] = useState("");
  const [musicStyle, setMusicStyle] = useState("");
  const [images, setImages] = useState([]);

  // Get the URL parameter `:projectId`

  const navigate = useNavigate();
  const { profileId } = useParams(); // <== ADD
  const storedToken = localStorage.getItem("authToken"); // <== ADD

  // This effect will run after the initial render and each time
  // the project id coming from URL parameter `projectId` changes

  useEffect(() => {
    axios
      .get(`${API_URL}/api/artists/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const artist = response.data;
        setName(artist.name);
        setDescription(artist.description);
        setMusicStyle(artist.musicStyle);
        setImages(artist.images);
        setProfilePic(artist.profilePic);
      })
      .catch((error) => console.log(error));
  }, [profileId]);

  const handleFormSubmit = (e) => {
    // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = {
      name,
      description,
      videos,
      musicStyle,
      profilePic,
      images,
    };

    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/artists/${profileId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/profileArtist/${profileId}`);
      });
  };
  function imgUpload(url) {
    if (url) {
      setImages(images.concat(url));
      setProfilePic(url);
    }
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Artist name:</label>
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
          <label className="col-sm-2 col-form-label">Music Style:</label>
          <div className="col-sm-10">
            <select
              className="form-select"
              multiple
              aria-label="multiple select example"
              type="text"
              name="musicStyles"
              value={musicStyle}
              onChange={(e) => setMusicStyle(e.target.value)}
            >
              <option value="rock">Rock</option>
              <option value="reggae">Reggae</option>
              <option value="Pop">Pop</option>
              <option value="romantic">Romantic</option>
              <option value="party">Party</option>
              <option value="swing">Swing</option>
              <option value="heavy">Heavy</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Videos:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="file"
              name="videos"
              value={videos}
              onChange={(e) => setVideos(e.target.value)}
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

        <div className="mb-3">
          <label for="formFile" className="form-label"> All your Images: </label>
          <div className="col-sm-10">
          <CloudinaryUpload  
          className="form-control form-control-sm"
          type="file" id="formFile" 
          imgUpload={imgUpload} 
          images={images} />
          </div>
        </div>


        <button className="btn btn-secondary" type="submit">Update Profile</button>
      </form>
    </div>
  );
}
