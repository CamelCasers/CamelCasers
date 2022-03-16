import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import CloudinaryUpload from "../components/CloudinaryUpload";



function CreateEventPage(props) {
  const { user } = useContext(AuthContext);
  //console.log("user 0=>", user);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState("");
  const [musicStyle, setMusicStyle] = useState("");
  const [description, setDescription] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [equipment, setEquipment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
      user,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/events`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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

        navigate(`/events/`);
      })
      .catch((error) => console.log(error));
  };
  function imgUpload(url) {
    if (url) {
      setImages(images.concat(url));
    }
  }
  
console.log({images})
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            min=""
            max
            name="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          />
          </div>
        </div>
        <div className="row mb-3">
          <label>Location: </label>
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
            <option value="swing">Chill</option>
            <option value="heavy">Jazz</option>
            <option value="heavy">Blues</option>
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

       

        




        <button className="btn btn-secondary" type="submit">
          {" "}
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;
