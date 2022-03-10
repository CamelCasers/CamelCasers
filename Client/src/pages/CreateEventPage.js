import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function CreateEventPage(props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState("");
  const [videos, setVideos] = useState("");
  const [musicStyle, setMusicStyle] = useState("");
  const [description, setDescription] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [equipment, setEquipment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, date, location, images, videos, musicStyle, description, timeRange, equipment };
   
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
   
    // Send the token through the request "Authorization" Headers
    axios
      .post(
      `${API_URL}/api/events`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
      // Reset the state
      setTitle("");
      setDate("");
      setLocation("");
      setImages("");
      setVideos("");
      setMusicStyle("");
      setDescription("");
      setTimeRange("");
      setEquipment("");
      //props.refreshProjects();
    })
      .catch((error) => console.log(error));
  };

  return (
    <div className="CreateEvent">

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label>Date:</label>
        <input type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <label>location:</label>
        <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
        <label>images:</label>
        <input type="text" name="images" value={images} onChange={(e) => setImages(e.target.value)}/>
        <label>videos:</label>
        <input type="text" name="videos" value={videos} onChange={(e) => setVideos(e.target.value)}/>
        <label>musicStyle:</label>
        <input type="text" name="musicStyle" value={musicStyle} onChange={(e) => setMusicStyle(e.target.value)}/>
        <label>description:</label>
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <label>timeRange:</label>
        <input type="text" name="timeRange" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}/>
        <label>equipment:</label>
        <input type="text" name="equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)}/>

        <button type="submit"> Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventPage
