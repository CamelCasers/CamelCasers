import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EventCard from "../components/EventCard";
import Search from "../components/Search";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


 

 
 
function EventListPage() {
  const [event, setEvents] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const { eventId } = useParams();
  const { user } = useContext(AuthContext);
 
  const getAllEvents = () => {

    const storedToken = localStorage.getItem("authToken");

    axios
    .get(
    `${process.env.REACT_APP_API_URL}/api/events`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
  )
    .then((response) => {setEvents(response.data)
                          setEventsData(response.data)})
    .catch((error) => console.log(error));
};


function filterEvents(eventSearch){  

 setEvents(eventsData.slice().filter((elem)=>{return (elem?.title?.toLowerCase().includes(eventSearch?.toLowerCase()))}))
}

function filterEventsLoc(eventSearch){
 setEvents(eventsData.slice().filter((elem)=>{return (elem?.location?.toLowerCase().includes(eventSearch?.toLowerCase()))}))
}



function filterEventsMusic(eventSearch){
  // console.log("<<<<<<<<<<<<<<<<< DATA>>>>>>>>>>>>>>>>",eventSearch)
  // console.log("<<<<<<<<<<<<<<<<< DATA event>>>>>>>>>>>>>>>>",event)
  // console.log("<<<<<<<<<<<<<<<<< DATA eventData>>>>>>>>>>>>>>>>",eventsData) 
  setEvents(eventsData.slice()
  .filter((elem)=>{return (elem.musicStyle.includes(eventSearch[0]))}))
if(eventSearch.length === 0)setEvents(eventsData)
}

 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllEvents();
  }, [] );
 
  
  return (
    <div>
      <Search filterEvents={filterEvents} filterEventsLoc={filterEventsLoc} filterEventsMusic={filterEventsMusic} noMusic={true}/>
      <hr/>

    {user?.isHost && <Link to={`/events/create`}>
        <button className="btn btn-outline-info">Create Event +</button>
      </Link>       
      }
      
      { event.map((event) => (

        <EventCard key={event._id} {...event} />
      ))}     
       
    </div>
  );
}
 
 
export default EventListPage;
