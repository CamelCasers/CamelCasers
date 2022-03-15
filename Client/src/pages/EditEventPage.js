import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CloudinaryUpload from "../components/CloudinaryUpload";

const API_URL = "http://localhost:5005";

function EditEventPage(props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
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
    //console.log("eventId >>>>>>>>>>>>>",eventId)
    axios
      .get(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneEvent = response.data;
        //console.log(oneEvent)
        setTitle(oneEvent.title);
        setDescription(oneEvent.description);
      })
      .catch((error) => console.log(error));
  }, [eventId, storedToken]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = {
      title,
      date,
      location,
      images,
      videos,
      musicStyle,
      description,
      timeRange,
      equipment,
    };
    console.log("requestBody =>", requestBody);

    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/events/${eventId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("2=>", requestBody);
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/events/${eventId}`);
      });
  };

  const deleteEvent = () => {
    axios
      .delete(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        //Once the delete request is resvolved succesfully
        // navigate back to the list of projects
        navigate("/events");
      })
      .catch((err) => console.log(err));
  };

  function imgUpload(url) {
    if (url) {
      setImages(images.concat(url));
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3">
          <label>Event title: </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label>Date: </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label>Time:</label>
          <div className="col-sm-10">
            <input
              type="time"
              name="timeRange"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label>Address: </label>
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

        <div className="row mb-3">
          <label>Description:</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label>Music Style: </label>
          <div className="col-sm-10">
            <select
              type="text"
              name="musicStyle"
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
              <option value="chill">Chill</option>
              <option value="classic">Classic</option>
              <option value="jazz">Jazz</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label>Equipment Provided:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="equipment"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label for="formFile" className="form-label">
            {" "}
            Event Images:{" "}
          </label>
          <CloudinaryUpload
            className="form-control form-control-sm"
            type="file"
            id="formFile"
            imgUpload={imgUpload}
            images={images}
          />
        </div>

        {/*<label>Videos:</label>
        <input
          type="file"
          name="videos"
          value={videos}
          onChange={(e) => setVideos(e.target.value)}
        />
       <hr/>*/}
    
        <button  className="btn btn-secondary" type="submit">Update Event</button>
      </form>
       <br/>
      <button className="btn btn-danger" onClick={deleteEvent}>Delete Event</button>
    </div>
  );
}

export default EditEventPage;
