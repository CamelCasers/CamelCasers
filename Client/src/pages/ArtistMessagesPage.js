import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";
export default function ArtistMessagesPage() {
  const { user } = useContext(AuthContext);
  const { profileId } = useParams();
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
      .get(`${API_URL}/api/artists/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneArtist = response.data;
        setArtist(oneArtist);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <div>
      <div>
        {artist.pendingEvents && <h1>Pending Events</h1>}
        {artist.pendingEvents.length == 0 && <p>Not pending events to confirm</p>}


        {artist.pendingEvents?.map((event) => (
          <div>
            <Container>
              <div className="centerItemsContainer">
                <div
                  className="centerItemsContainer backgroundEventCard text-white"
                  style={{ width: "20rem" }}
                >
                  <Card.Title>{event.date}</Card.Title>
                  {console.log("Pending events", event)}
                  <Card.Img variant="top" src={event.images[0]} style={{}} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>Music Style: {event.musicStyle}</Card.Text>
                    <Card.Text>Address: {event.location}</Card.Text>

                    <Link to={`/events/${event._id}`}>
                      <button className="btn btn-outline-warning ">
                        Pedro Cagon
                      </button>
                    </Link>
                  </Card.Body>
                </div>
              </div>
            </Container>
          </div>
        ))}
      </div>
      <div>
        {artist.events && <h1>Confirmed Events</h1>}

        {artist.events?.map((event) => (
          <div>
            <Container>
              <div className="centerItemsContainer">
                <div
                  className="centerItemsContainer backgroundEventCard text-white"
                  style={{ width: "20rem" }}
                >
                  <Card.Title>{event.date}</Card.Title>
                  {console.log("confirmed Eents", artist.events)}
                  <Card.Img variant="top" src={event.images[0]} style={{}} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>Music Style: {event.musicStyle}</Card.Text>
                    <Card.Text>Address: {event.location}</Card.Text>

                    <Link to={`/events/${event._id}`}>
                      <button className="btn btn-outline-warning ">
                        See Details
                      </button>
                    </Link>
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
