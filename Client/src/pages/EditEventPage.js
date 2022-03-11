import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditEventPage(props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState("");
  const [videos, setVideos] = useState("");
  const [musicStyle, setMusicStyle] = useState("");
  const [description, setDescription] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [equipment, setEquipment] = useState("");

  // Get the URL parameter `:eventId` 
  const { eventId } = useParams();      
  const navigate = useNavigate();  
  
  const storedToken = localStorage.getItem("authToken");
    

 // This effect will run after the initial render and each time
 // the event id coming from URL parameter `eventtId` changes
  
  useEffect(() => {                                
    axios
      .get(`${API_URL}/api/event/${eventId}`,  
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setDescription(oneEvent.description);
      })
      .catch((error) => console.log(error));
    
  }, [eventId, storedToken]);

  const handleFormSubmit = (e) => {                    
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, date, location, images, videos, musicStyle, description, timeRange, equipment };
    console.log("requestBody =>", requestBody);
 
    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/events/${eventId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log("2=>", requestBody);
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/events/${eventId}`)
      });
  };

  const deleteEvent = () => {
    axios
    .delete(`${API_URL}/api/events/${eventId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` }}
    )
    .then(()=>{
      //Once the delete request is resvolved succesfully 
      // navigate back to the list of projects
      navigate("/events");
    })
    .catch((err)=> console.log(err));
  };

  
  return (
    <div className="EditEventPage">
      <h3>Edit the Event</h3>
       
        <Link to={`/events/create`}>
          <button>Create Event</button>
        </Link>
      

      <form onSubmit={handleFormSubmit}>
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

        <button type="submit">Update Event</button>
      </form>
         
         <button onClick={deleteEvent}>Delete Event</button>
       
    </div>

    
  );
}

export default EditEventPage;
