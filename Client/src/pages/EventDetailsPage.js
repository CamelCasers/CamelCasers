// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

const API_URL = "http://localhost:5005"; 

function EventDetailsPage (props) {
  const [event, setEvent] = useState(null);

  //Get the URL paramenter `:projectId`
  const { eventId } = useParams();

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
          <h1>Project: {props.title}</h1>
          <p>Description: {props.description}</p>
        </>
      

      <Link to="/events">
        <button>Back to events</button>
      </Link>

      <Link to={`/events/edit/${props._id}`}>
        <button>Edit Event</button>
      </Link>

      
    </div>
  );
}

export default EventDetailsPage;
