// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Card, Container } from "react-bootstrap";



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

  console.log("kkkkkkkkkkkkkkkkkkkkkkkk", event.host)

  //helper function
  const storedToken = localStorage.getItem("authToken");
  const getEvents = () => {
    // Get the token from the localStorage

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`, {
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
    .put(`${process.env.REACT_APP_API_URL}/api/events/join`, {
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
    .put(`${process.env.REACT_APP_API_URL}/api/events/decide`, {
      artistId: artist,
      eventId: eventId,
    })
    .then((resp)=>{
      //setEvent(resp.data)
      getEvents();
      
    }).catch((err)=>console.log(err))
  }
  
  const handleRefuse = (artist) =>{
    console.log("artust>>>>>>>>>>>>",artist._id,"evetn>>>>>>>>>>>>>>",event._id );
    axios
    .post(`${process.env.REACT_APP_API_URL}/api/events/reject`, {
      artistId: artist._id,
      eventId: event._id,
    })
    .then((resp)=>{
      //setEvent(resp.data)
      getEvents();
      
    }).catch((err)=>console.log(err))
  }
  
  const handleDecline = (artist) => {
    
    //console.log("artust>>>>>>>>>>>>",artist._id,"evetn>>>>>>>>>>>>>>",event._id );

    axios
    .put(`${process.env.REACT_APP_API_URL}/api/events/reject`, {
      artistId: artist._id,
      eventId: event._id,
    })
    .then((resp)=>{
      //setEvent(resp.data)
      getEvents();
      
    }).catch((err)=>console.log(err))
      
  }

  useEffect(() => {
    getEvents();
  
  }, []);

  let day = event.date?.slice(8,10)
  let month = event.date?.slice(5,7)
  let year = event.date?.slice(0,4)

  
  return (
    <div className="centerItemsContainer  container">

        <h1>{event.title}</h1>          
        <h6 className="text-muted">Host of the event: </h6>
        

      <Link to={`/profileHost/${event.host._id}`} eventDetails={event.title}>
      <button className="btn btn-success btn-sm">{event.host.name}</button>
      </Link>

      <div>
      <img
            className="profile-imgSmall"
            src={event?.host.profilePic}
            alt="pic"
          />
          </div>
      

      <p style={{ maxWidth: "400px" }}>Date: {day}/{month}/{year} </p>
      <p style={{ maxWidth: "400px" }}>Address: {event.location} </p>

      {event.images.map((img) => (
        <img src={img} alt="pic" width={300} />
      ))} 

      <br/>

     <p >Music Style: {event?.musicStyle} </p> 
      <p >Description: {event?.description} </p>
      <p >Time Range: {event?.timeRange} </p>
      <p >Equipment: {event?.equiptment} </p>
       <p >Artists: {event.artists.map((artist)=>(

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
      <button onClick={()=>handleRefuse(artist)}className="btn btn-outline-danger">
        Refuse
      </button>

  
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
