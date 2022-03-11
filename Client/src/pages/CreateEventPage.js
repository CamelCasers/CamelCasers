import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

const API_URL = "http://localhost:5005";

function CreateEventPage(props) {
  const { host } = useContext(AuthContext);
  console.log("host 0=>", host)
  console.log("hostid 1=>", host._id)
  console.log("hostid 2 =>", host.id)

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState("");
  const [videos, setVideos] = useState("");
  const [musicStyle, setMusicStyle] = useState("");
  const [description, setDescription] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [equipment, setEquipment] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, date, location, images, videos, musicStyle, description, timeRange, equipment };
   
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
   
    // Send the token through the request "Authorization" Headers
    axios
      .post(
      `${API_URL}/api/events/${host._id}`,
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
      //props.refreshEvents();

      navigate(`/events/`)
    })
      .catch((error) => console.log(error));
  };

  return (
    <div className="CreateEvent">

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <br/>
        <label>Date:</label>
        <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <br/>
        <label>Location:</label>
        <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
        <br/>
        <label>Images:</label>
        <input type="file" name="images" value={images} onChange={(e) => setImages(e.target.value)}/>
        <br/>
        <label>Videos:</label>
        <input type="file" name="videos" value={videos} onChange={(e) => setVideos(e.target.value)}/>
        <br/>
        <label>Music Style:</label>
        <select type="text" name="musicStyle" value={musicStyle} onChange={(e) => setMusicStyle(e.target.value)}>
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
        <label>Description:</label>
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <br/>
        <label>Time Range:</label>
        <input type="time" min="" max name="timeRange" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}/>
        <br/>
        <label>Equipment:</label>
        <input type="text" name="equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)}/>
        <br/>

        <button type="submit"> Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventPage
