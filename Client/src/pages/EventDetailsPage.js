// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button } from "react-bootstrap";

const API_URL = "http://localhost:5005";

function EventDetailsPage(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  let host = false;
  let artist = false;
  if (user) {
    host = user.isHost;
    artist = !user.isHost;
  }

  const [event, setEvent] = useState({
    title: "",
    date: "",
    location: "",
    images: [],
    videos: "",
    musicStyle: "",
    description: "",
    timeRange: "",
    equiptment: "",
    artists: "",
    host: "",
  });

  //Get the URL paramenter `:eventId`
  const { eventId } = useParams();
  
  
  //helper function
  const storedToken = localStorage.getItem("authToken");
  const getEvents = () => {
    // Get the token from the localStorage

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  const handleJoin = () => {
    console.log(user._id, eventId );
    axios
    .put(
      `${API_URL}/api/events/join`,     
      {artistId: user._id, eventId: eventId}
    ).then((__)=>{
      navigate(`/profileArtist/${user._id}/artistMessages`)
    }).catch((error)=> console.log(error))
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (

    
    <div className="EventDetails">
      <Link to={`/events/${event._id}`} eventDetails={event.title}>
        <h3>Event Name: {event.title}</h3>
      </Link>

      <Link to={`/profileHost/${event.host._id}`} eventDetails={event.title}>
        <h4>Host: {event.host.name}</h4>
      </Link>

      <p style={{ maxWidth: "400px" }}>Date: {event.date} </p>
      <p style={{ maxWidth: "400px" }}>Location: {event.location} </p>

      {event.images.map((img) => (
        <img src={img} alt="pic" width={300} />
      ))}

      <p style={{ maxWidth: "400px" }}>Videos: {event.videos} </p>
      <p style={{ maxWidth: "400px" }}>Music Style: {event.musicStyle} </p>
      <p style={{ maxWidth: "400px" }}>Description: {event.description} </p>
      <p style={{ maxWidth: "400px" }}>Time Range: {event.timeRange} </p>
      <p style={{ maxWidth: "400px" }}>Equipment: {event.equiptment} </p>
      <p style={{ maxWidth: "400px" }}>Artists: {event.artists} </p>

      <hr />

      <Link to="/events">
        <Button>Back to events</Button>
      </Link>

      <div>
        {user._id === event.host._id && (
          <Link to={`/events/edit/${eventId}`}>
            <Button>Edit Event</Button>
          </Link>
        )}

        {artist && <Button onClick={handleJoin}>Apply to Event</Button>}
      </div>
    </div>
  );
}

export default EventDetailsPage;
