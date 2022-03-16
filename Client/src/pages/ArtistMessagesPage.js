import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";



export default function ArtistMessagesPage() {
  const { user } = useContext(AuthContext);
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState({
    name: "",
    email: "",
    profilePic: "",
    musicStyle: [],
    images: [],
    videos: [],
    events: [],
    pendingEvents: [],
  });

  const storedToken = localStorage.getItem("authToken");
  function getArtist() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/artists/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneArtist = response.data;
        setArtist(oneArtist);
      })
      .catch((error) => console.log(error));
  }

  const handleRejectPending = (event) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/events/reject`, {
        artistId: artist._id,
        eventId: event._id,
      })
      .then((__) => {
        getArtist();
        navigate(`/profileArtist/${user._id}/artistMessages`);
      })
      .catch((error) => console.log(error));
  };

  const handleRejectConfirmed = (event) => {
   
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/events/reject`, {
        artistId: artist._id,
        eventId: event._id
      })
     
      .then((__) => {
        navigate(`/profileArtist/${user._id}/artistMessages`);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArtist();
  }, []);

 


  return (
    <div>
      <div>
        {artist.pendingEvents && <h1>Pending Events</h1>}
        {artist.pendingEvents.length == 0 && (
          <p>Not pending events to confirm</p>
        )}
        

        {artist.pendingEvents?.map((event) => (
          <div>
            <Container>
              <div className="centerItemsContainer">
                <div
                  className="centerItemsContainer backgroundEventCard text-white"
                  style={{ width: "20rem" }}
                >
  
                  <Card.Title>{event.date?.slice(8,10)}/{event.date?.slice(5,7)}/{event.date?.slice(0,4)}</Card.Title>
                  {console.log("Pending events", event)}
                  <Card.Img variant="top" src={event.images[0]} style={{}} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>Music Style: {event.musicStyle}</Card.Text>
                    <Card.Text>Address: {event.location}</Card.Text>

                    <div className="btn-group gap-3" role="group" aria-label="Basic outlined example">
                    <Link to={`/events/${event._id}`}>
                      <button className="btn btn-outline-warning">
                        See Details
                      </button>
                    </Link>
                    
                    <button
                      onClick={() => handleRejectPending(event)}
                      className="btn btn-outline-danger "
                      >
                      Withdraw </button>
                      </div>
                      
                  </Card.Body>
                </div>
              </div>
            </Container>
          </div>
        ))}
      </div>
      <div>
        {artist.events &&  <h1>Confirmed Events</h1>}

        {artist.events?.map((event) => (
          <div>
            <Container>
              <div className="centerItemsContainer">
                <div
                  className="centerItemsContainer backgroundEventCard text-white"
                  style={{ width: "20rem" }}
                >
                  <Card.Title>{event.date}</Card.Title>
                  
                  <Card.Img variant="top" src={event.images[0]} style={{}} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>Music Style: {event.musicStyle}</Card.Text>
                    <Card.Text>Address: {event.location}</Card.Text>

                  <div className="btn-group gap-3" role="group" aria-label="Basic outlined example">
                    <Link to={`/events/${event._id}`}>
                      <button className="btn btn-outline-warning ">
                        See Details
                      </button>
                    </Link>
                  
                      <button
                        onClick={() => handleRejectConfirmed(event)}
                        className="btn btn-outline-danger "
                      >
                         Withdraw
                      </button>
                    </div>
                    
                  </Card.Body>
                </div>
              </div>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
}
