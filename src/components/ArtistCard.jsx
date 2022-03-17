import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";

function ArtistCard(props) {
  const {
    name,
    profilePic,
    images,
    videos,
    musicStyle,
    description,
    playlist,
    events,
    location,
    _id,
  } = props;

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
            <Card.Text>
            {musicStyle?.map((style) => (
        <li className="musicStyleColor">{style}</li>
      ))} </Card.Text>
            <Link to={`/profileArtist/${_id}`}>
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
  );
}

export default ArtistCard;
