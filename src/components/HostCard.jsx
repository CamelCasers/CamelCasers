import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";

function HostCard(props) {
  const { name, profilePic, description, location, events, _id, email } = props;

  let eventsHosted = events.length

  return (
    <Container>
      <div className="centerItemsContainer">
        
        <div className="backgroundArtistCard text-white" style={{ width: "20rem" }}>
        <div>
          <img
            className="profile-img"
            style={{ maxWidth: "200px" }}
            src={profilePic} alt="pic" />
            </div>
          <div>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{location} </Card.Text>
            <Card.Text>hosted events: {eventsHosted} </Card.Text>
            <Link to={`/profileHost/${_id}`}>
            <button className="btn btn-outline-warning">
              Go to Profile
            </button>
            </Link>

          </Card.Body>
          </div>
        </div>
        <br/>
      </div>
    </Container>

    // <div className={"ProjectCard card"}>

    //   <Link to={`/profileHost/${_id}`} hostDetails = {name}>
    //     <h3>{name}</h3>
    //   </Link>
    //   <img src={profilePic} className="profile-img" alt="Pic" />
    //   <p style={{ maxWidth: "400px" }}>Description: {description} </p>

    // </div>
  );
}

export default HostCard;
