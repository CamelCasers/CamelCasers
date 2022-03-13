import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";



function ArtistCard(props) {

const {name, profilePic, images, videos, musicStyle, description, playlist, events, _id
} = props
  
    return (

      <Card className="backgroundGrey text-white">
      <Card.Img className="rounded mx-auto d-block" style={{ maxWidth: "300px" }} src={profilePic} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Description: {description} </Card.Text>
        <Card.Text>Music Style: {musicStyle} </Card.Text>

        <Button variant="primary" as={Link} to= {`/profileHost/${_id}`}>Go to Profile</Button>
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