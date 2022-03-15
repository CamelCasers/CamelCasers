// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Card, Container } from "react-bootstrap";

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
    date: null,
    location: "",
    images: [],
    videos: [],
    musicStyle: [],
    description: "",
    timeRange: "",
    equiptment: [],
    artists: [],
    host: {},
    pendingArtists: [],
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
        console.log(oneEvent);
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  const handleJoin = () => {
    axios
      .put(`${API_URL}/api/events/join`, {
        artistId: user._id,
        eventId: eventId,
      })
      .then((__) => {
        navigate(`/profileArtist/${user._id}/artistMessages`);
      })
      .catch((error) => console.log(error));
  };

  const handleAccept = (artist) => {
   
    axios
    .put(`${API_URL}/api/events/decide`, {
      artistId: artist,
      eventId: eventId,
    })
    .then((resp)=>{
      setEvent(resp.data)
      navigate(`/events/${event._id}`)
    }).catch((err)=>console.log(err))
  }

  const handleDecline = (artist) => {
    console.log(artist);
    axios
    .delete(`${API_URL}/api/events/decide`, {
      artistId: artist,
      eventId: eventId,
    })
    .then((__)=>{
      navigate(`/events/${event._id}`)
    }).catch((err)=>console.log(err))
      
  }

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

      <p style={{ maxWidth: "400px" }}>Videos: {event?.videos} </p> 
     <p style={{ maxWidth: "400px" }}>Music Style: {event?.musicStyle} </p> 
      <p style={{ maxWidth: "400px" }}>Description: {event?.description} </p>
      <p style={{ maxWidth: "400px" }}>Time Range: {event?.timeRange} </p>
      <p style={{ maxWidth: "400px" }}>Equipment: {event?.equiptment} </p>
       <p style={{ maxWidth: "400px" }}>Artists: {event.artists.map((artist)=>(

<Container>
<div className="centerItemsContainer">

  <div className="backgroundArtistCard text-white" style={{ width: "20rem" }}>
  <div>
    <img
      className="profile-img"
      style={{ maxWidth: "200px" }}
      src={artist.profilePic} alt="pic" />
      </div>
    <div>
    <Card.Body>
      <Card.Title>{artist.name}</Card.Title>
   
      <Card.Text>Styles: {artist.musicStyle} </Card.Text>
    <div>
      <Link to={`/profileArtist/${artist._id}`}>
      <button className="btn btn-outline-warning">
        Go to Profile
      </button>
      </Link>
  
    </div>

    </Card.Body>
    </div>
  </div>
  <br/>
</div>
</Container>

       ))} </p>  

      <hr />

      <Link to="/events">
        <Button>Back to events</Button>
      </Link>

      <div>
        {user?._id === event?.host._id && (
         
        <>
          <Link to={`/events/edit/${eventId}`}>
              <Button>Edit Event</Button>
            </Link> 
           <div>
             <h1>Applying Artists</h1>
             {event.pendingArtists && event.pendingArtists.map((artist) => (
               <div key={artist._id}>
    <Container>
       <div className="centerItemsContainer">
      
         <div className="backgroundArtistCard text-white" style={{ width: "20rem" }}>
         <div>
           <img
             className="profile-img"
             style={{ maxWidth: "200px" }}
             src={artist.profilePic} alt="pic" />
             </div>
           <div>
           <Card.Body>
             <Card.Title>{artist.name}</Card.Title>
          
             <Card.Text>Styles: {artist.musicStyle} </Card.Text>
           <div>
             <Link to={`/profileArtist/${artist._id}`}>
             <button className="btn btn-outline-warning">
               Go to Profile
             </button>
             </Link>
             <button onClick ={()=>handleAccept(artist)}className="btn btn-outline-success">
              Accept
             </button>
             <button onClick ={()=>handleDecline(artist)}className="btn btn-outline-danger">
               Decline
             </button>
           </div>

           </Card.Body>
           </div>
         </div>
         <br/>
       </div>
    </Container>

                
               </div>
             ))}
           </div>
           </>
        )}

       {artist && <Button onClick={handleJoin}>Apply to Event</Button>} 
      </div> 
    </div>
  );
             }

export default EventDetailsPage;
