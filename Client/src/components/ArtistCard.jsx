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
    _id,
  } = props;

  return (
    <Container>
      <div className="centerItemsContainer">
        <Card className="backgroundMiki text-white" style={{ width: "18rem" }}>
          <Card.Img
            className=" mx-auto d-block profile-imgCard"
            style={{ maxWidth: "200px" }}
            src={profilePic}
            
           
          />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>Description: {description} </Card.Text>
            <Card.Text>Music Style: {musicStyle} </Card.Text>

            <button className="btn btn-outline-warning" variant="primary" as={Link} to={`/profileArtist/${_id}`}>
              Go to Profile
            </button>
          </Card.Body>
        </Card>
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
