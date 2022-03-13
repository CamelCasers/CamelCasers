
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUpload from "../components/CloudinaryUpload";
import YoutubeUpload from "../components/YoutubeUpload";

const API_URL = "http://localhost:5005";


export default function ArtistFormPage() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
 
  const [videos, setVideos] = useState([]);
  const [musicStyle, setMusicStyle] = useState("");
  const [images, setImages] = useState([]);

  const [video1, setVideo1] = useState(videos[0]);
  const [video2, setVideo2] = useState(videos[1]);
  const [video3, setVideo3] = useState(videos[2]);

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
        setVideos(artist.videos)
       

      })
      .catch((error) => console.log(error));
    
  }, [profileId]);

  const handleFormSubmit = (e) => {                     // <== ADD
    e.preventDefault();

      

    // Create an object representing the body of the PUT request
    const requestBody = { name, description, videos, musicStyle, images };
 
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
    }

  }


  function handleVideos1(e){ 
    let videoLong = e.target.value
    let videoEmbed = videoLong.slice(videoLong.indexOf("watch?v=")+8,videoLong.indexOf("watch?v=")+19)
    // let copyVideos = videos.slice().splice(2,1,videoEmbed)
    // // copyVideos.push("")
    // copyVideos.push("")
    // copyVideos.push("")
    setVideo1(videoEmbed)
    console.log("video 1 ====>", videoEmbed, "video1 >>>>>>>>>>>>", video1)
   
  }
  function handleVideos2(e){
    let videoLong = e.target.value
    let videoEmbed = videoLong.slice(videoLong.indexOf("watch?v=")+8,videoLong.indexOf("watch?v=")+19)
  //  let copyVideos = videos.slice().splice(2,1,videoEmbed)
    // copyVideos.push("")
    // copyVideos.push("")
    // copyVideos.push("")
    setVideo2(videoEmbed)
    console.log("video 3 ====>", videoEmbed, "video2 >>>>>>>>>>>>", video2)
    
  }
  function handleVideos3(e){
    let videoLong = e.target.value
    let videoEmbed = videoLong.slice(videoLong.indexOf("watch?v=")+8,videoLong.indexOf("watch?v=")+19)
   // let copyVideos = videos.slice().splice(2,1,videoEmbed)
    // copyVideos.push("")
    // copyVideos.push("")
    // copyVideos.push("")
    setVideo3(videoEmbed)
    console.log("video 3 ====>", videoEmbed, "video3 >>>>>>>>>>>>", video3)
    
  }
function delete1(e){
  e.preventDefault()
  setVideo1("")
}
function delete2(e){
  e.preventDefault()
  setVideo2("")
}
function delete3(e){
  e.preventDefault()
  setVideo3("")
}

  useEffect(()=>{
    setVideos([video1,video2,video3])
  },[video1, video2, video3])


console.log(video1,video2,video3)
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
<br/>
        <label>Youtube video links:</label>
        <br/>
        <input type="text" name="videos" value={video1} onChange={handleVideos1}/>
        <br/>
        {videos[0] !== "" && (
        <YoutubeUpload embedId={videos[0]}/>
        )}

        {console.log(videos,video1,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< VIDOE 1111")}
        
        <button onClick={delete1}>Delete 1</button>
        <br/>
        <input type="text" name="videos" value={video2} onChange={handleVideos2}/>
        <br/>

        {videos[1] !== "" && (
        <YoutubeUpload embedId={videos[1]}/>
        )}
        
        <button onClick={delete2}>Delete 2</button>
        <br/>
        <input type="text" name="videos" value={videos[2]} onChange={handleVideos3}/>
        <br/>
        {videos[2] !== "" && (
        <YoutubeUpload embedId={videos[2]}/>
        )}
        <button onClick={delete3}>Delete 3</button>
        




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
        <h1>..................................................................................</h1>
        <CloudinaryUpload imgUpload={imgUpload} images={images}/>
        <h1>..................................................................................</h1>

        <button type="submit">Update Profile</button>
      </form>

    </div>
  );
}
