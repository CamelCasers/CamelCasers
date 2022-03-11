// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

const API_URL = "http://localhost:5005"; 

function EventDetailsPage (props) {
  const [event, setEvent] = useState({ title: "",
   date:"",
    location:"",
     images:"",
      videos:"",
       musicStyle:"",
        description:"", 
        timeRange:"",
         equiptment:"",
          host:""});

  //Get the URL paramenter `:eventId`
  const { eventId } = useParams();
  console.log(eventId, event);

  //helper function
  const getProject = () => {
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
    getProject()
  }, []);

  
  return (
    <div className="EventDetails">
      
        <>
          <h1>Project: {event.title}</h1>
          <p>Description: {event.description}</p>
          <p>Host: {event.host.name}</p>
        </>
      

      <Link to="/events">
        <button>Back to events</button>
      </Link>

      <Link to={`/events/edit/${eventId}`}>
        <button>Edit Event</button>
      </Link>

      
    </div>
  );
}

export default EventDetailsPage;
