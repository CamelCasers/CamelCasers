// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Card, Container } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import MapPage from "../components/MapPage";


    // 
    // 

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
      .then((resp) => {
        //setEvent(resp.data)
        getEvents();
      })
      .catch((err) => console.log(err));
  };

  const handleRefuse = (artist) => {
    console.log(
      "artust>>>>>>>>>>>>",
      artist._id,
      "evetn>>>>>>>>>>>>>>",
      event._id
    );
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/events/reject`, {
        artistId: artist._id,
        eventId: event._id,
      })
      .then((resp) => {
        //setEvent(resp.data)
        getEvents();
      })
      .catch((err) => console.log(err));
  };

  const handleDecline = (artist) => {
    //console.log("artust>>>>>>>>>>>>",artist._id,"evetn>>>>>>>>>>>>>>",event._id );

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/events/reject`, {
        artistId: artist._id,
        eventId: event._id,
      })
      .then((resp) => {
        //setEvent(resp.data)
        getEvents();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEvents();
  }, []);

  let day = event.date?.slice(8, 10);
  let month = event.date?.slice(5, 7);
  let year = event.date?.slice(0, 4);

  return (
    <div className="centerItemsContainer centerText container">
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

      <p style={{ maxWidth: "400px" }}>
        Date: {day}/{month}/{year}{" "}
      </p>

      <p>
        Time: <span className="musicStyleColor">{event?.timeRange}</span>{" "}
      </p>
      <p>
        Equipment: <span className="musicStyleColor">{event?.equipment}</span>{" "}
      </p>
  
      <Carousel  >
        {event.images.map((item) => (
          <Carousel.Item >
            <img className="d-block w-100 event-img" src={item} alt={item} />
          </Carousel.Item>
        ))}
      </Carousel>

      <br />

      <p>
        Music Style :{" "}
        {event?.musicStyle.map((style) => (
          <span className="musicStyleColor">{style}</span>
        ))}{" "}
      </p>

      <h5>Description: </h5>
      <p className="musicStyleColor">{event?.description}</p>

      <h5>Event location</h5>

      <p style={{ maxWidth: "400px" }}><span>{event.location}</span>  </p>
      {/* //////////////////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////////////// */}

{/* //////////////////////////////////////////////////////////////// */}

      <MapPage location={event.location}/>


      {/* //////////////////////////////////////////////////////////////// */}

      {/* //////////////////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////////////// */}

      <hr />


      {user?._id === event?.host._id && (
        <Link to={`/events/edit/${eventId}`}>
          <button className="btn btn-outline-warning">Edit Event</button>
        </Link>
      )}


      <hr />

      <Link to="/events">
        <button className="btn btn-secondary">Back to events</button>
      </Link>

      <div className="centerItemsContainer">
        <h3>Artists Attending: </h3>
        {event.artists.map((artist) => (
          <Container>
            <div className="centerItemsContainer">
              <div
                className="backgroundArtistCard text-white"
                style={{ width: "20rem" }}
              >
                <div>
                  <img
                    className="profile-img"
                    style={{ maxWidth: "200px" }}
                    src={artist.profilePic}
                    alt="pic"
                  />
                  {user?._id === event.host._id && (
                        <button
                          onClick={() => handleRefuse(artist)}
                          className="btn btn-danger btn-sm mb-2"
                        >
                          Cancel
                        </button>
                      )}
                </div>
                <div>
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>

                    <ul>
                      {artist.musicStyle?.map((style) => (
                        <li className="musicStyleColor">{style}</li>
                      ))}{" "}
                    </ul>
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
              <br />
            </div>
          </Container>
        ))}{" "}
      </div>

      <div className="centerItemsContainer">
        {user?._id === event?.host._id && (
          <>
            <div className="centerItemsContainer">
              <h2>Applying Artists</h2>
              {event.pendingArtists &&
                event.pendingArtists.map((artist) => (
                  <div key={artist._id}>
                    <Container>
                      <div className="centerItemsContainer">
                        <div
                          className="backgroundArtistCard text-white"
                          style={{ width: "20rem" }}
                        >
                          <div>
                            <img
                              className="profile-img"
                              style={{ maxWidth: "200px" }}
                              src={artist.profilePic}
                              alt="pic"
                            />
                            <div>
                              <div
                                className="btn-group gap-1 mb-2"
                                role="group"
                                aria-label="Basic mixed styles example"
                              >
                                <button 
                                  onClick={() => handleAccept(artist)}
                                  className="btn btn-success btn-sm"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleDecline(artist)}
                                  className="btn btn-danger btn-sm"
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Card.Body>
                              <Card.Title>{artist.name}</Card.Title>

                              <ul>

                                {artist.musicStyle?.map((style) => (
                                  <li className="musicStyleColor start">
                                    {style}
                                  </li>
                                ))}{" "}
                              </ul>

                              <Link to={`/profileArtist/${artist._id}`}>
                                <button className="btn btn-outline-warning">
                                  Go to Profile
                                </button>
                              </Link>
                            </Card.Body>
                          </div>
                        </div>
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
