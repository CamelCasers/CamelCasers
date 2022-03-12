import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EventCard from "../components/EventCard";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

 
const API_URL = "http://localhost:5005";
 
 
function MyEventsListPage() {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);
 
  const getAllEvents = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
    .get(
    `${API_URL}/api/hosts/${user._id}`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
  )
    .then((response) => setEvents(response.data.events))
    .catch((error) => console.log(error));
};
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllEvents();
  }, [] );
 
  
  return (
    <div className="EventListPage">

      <hr/>

      <Link to={`/events/create`}>
        <button>Create Event</button>
      </Link>  
      <hr/>
      
      { events.map((event) => (

        <EventCard key={event._id} {...event} />
      ))}     
       
    </div>
  );
}
 
 
export default MyEventsListPage;
