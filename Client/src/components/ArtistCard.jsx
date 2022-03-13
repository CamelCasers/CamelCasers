import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";



function ArtistCard(props) {

const {name, profilePic, images, videos, musicStyle, description, playlist, events, _id
} = props
  
    return (

      <Card style={{ width: "18rem" }} className="backgroundGrey text-white">
      <Card.Img variant="top" src={profilePic} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
        {description}
        </Card.Text>
        <Button variant="primary" as={Link} to= {`/profileHost/${_id}`}>Details</Button>
      </Card.Body>
    </Card>

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