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

    /*  <div className="card">                 
     
         <img src={profilePic} className="profile-img" alt="Pic"/>
          <div class="card-body">
          <Link to={`/profileArtist/${_id}`} artistDetails = {name}>
          <h3>{name}</h3>
          </Link>  
          <p style={{ maxWidth: "400px" }}>Description: {description} </p>
          <p style={{ maxWidth: "400px" }}>Music Style: {musicStyle} </p>
          </div>
        </div>*/
  );
}

export default ArtistCard;
