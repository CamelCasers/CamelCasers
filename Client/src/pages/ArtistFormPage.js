
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUpload from "../components/CloudinaryUpload";

const API_URL = "http://localhost:5005";


export default function ArtistFormPage() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic,setProfilePic] = useState("")
  const [videos, setVideos] = useState("");
  const [musicStyle, setMusicStyle] = useState("");
  const [images, setImages] = useState([]);

  // Get the URL parameter `:projectId` 
      
  const navigate = useNavigate();      
  const { profileId } = useParams();      // <== ADD 
  const storedToken = localStorage.getItem("authToken");                            // <== ADD
    
 // This effect will run after the initial render and each time
 // the project id coming from URL parameter `projectId` changes
  
  useEffect(() => {      
    axios
      .get(`${API_URL}/api/artists/${profileId}`,{
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const artist = response.data;
        setName(artist.name);
        setDescription(artist.description);
        setMusicStyle(artist.musicStyle)
        setImages(artist.images)
        setProfilePic(artist.profilePic);

      })
      .catch((error) => console.log(error));
    
  }, [profileId]);

  const handleFormSubmit = (e) => {                     // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { name, description, videos, musicStyle, profilePic, images };
 
    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/artists/${profileId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/profileArtist/${profileId}`)
      });
  };
  function imgUpload(url){
    if(url){
      setImages(images.concat(url))
      setProfilePic(url)
    }

  }
  return (
    
    <div className="EditProjectPage">
      <h3>Edit your Artist Profile</h3>

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

        <label>Videos:</label>
        <input type="text" name="videos" value={videos} onChange={(e) => setVideos(e.target.value)}/>
        <br/>
        <label>Music Style:</label>
        <select type="text" name="musicStyle" value={musicStyle} onChange={(e) => setMusicStyle(e.target.value)} >
                  <option value="rock">Rock</option>
                  <option value="reggae">Reggae</option>
                  <option value="Pop">Pop</option>
                  <option value="romantic">Romantic</option>
                  <option value="party">Party</option>
                  <option value="swing">Swing</option>
                  <option value="heavy">Heavy</option>
                  <option value="others">Others</option>
        </select>
        <br/>
        <CloudinaryUpload imgUpload={imgUpload} images={profilePic}/>
        <h1>..................................................................................</h1>
        <CloudinaryUpload imgUpload={imgUpload} images={images}/>
        <h1>..................................................................................</h1>

        <button type="submit">Update Profile</button>
      </form>

    </div>
  );
}
