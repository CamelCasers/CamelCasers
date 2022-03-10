import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";
import CreateEventPage from "./CreateEventPage";
 
const API_URL = "http://localhost:5005";
 
 
function EventListPage() {
  const [event, setEvents] = useState([]);
  const { eventId } = useParams();
 
  const getAllEvents = () => {

    const storedToken = localStorage.getItem("authToken");

    axios
    .get(
    `${API_URL}/api/events`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
  )
    .then((response) => setEvents(response.data))
    .catch((error) => console.log(error));
};
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllEvents();
  }, [] );
 
  
  return (
    <div className="EventListPage">

      <Link to={`/events/edit/${eventId}`}>
        <button>Edit Event</button>
      </Link>

      
      { event.map((event) => (
        <ProjectCard key={event._id} {...event} />
      ))}     
       
    </div>
  );
}
 
 
export default EventListPage;
