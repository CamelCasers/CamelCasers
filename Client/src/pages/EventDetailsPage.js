// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005"; 

function EventDetailsPage (props) {
  const { user } = useContext(AuthContext);


  const [event, setEvent] = useState({ title: "",
   date:"",
    location:"",
     images:[],
      videos:"",
       musicStyle:"",
        description:"", 
        timeRange:"",
         equiptment:"",
          artists:"",
          host:""});

  //Get the URL paramenter `:eventId`
  const { eventId } = useParams();
  //console.log(eventId, event);

  //helper function
  const getEvents = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
   
    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/events/${eventId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvents()
  }, []);

  console.log(user._id,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
  
  return (
    <div className="EventDetails">
      
      <Link to={`/events/${event._id}`} eventDetails = {event.title}>
            <h3>Event Name: {event.title}</h3>
          </Link>

          <Link to={`/profileHost/${event.host._id}`} eventDetails = {event.title}>
            <h4>Host: {event.host.name}</h4>
          </Link>

          <p style={{ maxWidth: "400px" }}>Date: {event.date} </p>
          <p style={{ maxWidth: "400px" }}>Location: {event.location} </p>

          {event.images.map((img)=>(
            <img src={img} alt="pic" width={300}/>
          ))}


          <p style={{ maxWidth: "400px" }}>Videos: {event.videos} </p>
          <p style={{ maxWidth: "400px" }}>Music Style: {event.musicStyle} </p>
          <p style={{ maxWidth: "400px" }}>Description: {event.description} </p>
          <p style={{ maxWidth: "400px" }}>Time Range: {event.timeRange} </p>
          <p style={{ maxWidth: "400px" }}>Equipment: {event.equiptment} </p>
          <p style={{ maxWidth: "400px" }}>Artists: {event.artists} </p>
      
      <hr/>

      <Link to="/events">
        <button>Back to events</button>
      </Link>

      
          {user._id === event.host._id && (
      <Link to={`/events/edit/${eventId}`}>
        <button>Edit Event</button>
      </Link>

          )}      

      
    </div>
  );
}

export default EventDetailsPage;
