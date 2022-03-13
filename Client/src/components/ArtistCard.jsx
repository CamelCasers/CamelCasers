import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";



function ArtistCard(props) {

const {name, profilePic, images, videos, musicStyle, description, playlist, events, _id
} = props
  
    return (
        <div className="card">                 
     
          <Card style={{ width: "20rem" }} className="backgroundGrey text-white">
          <Card.Img variant="card-img-top" class="card-img-top" style={{ width: "10rem" }} src={profilePic} />
          <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Bio: {description}</Card.Text>
          <Card.Text>Music Styles: {musicStyle}</Card.Text>

        <Button variant="primary" as={Link} to= {`/profileHost/${_id}`}>Go to Profile</Button>
      </Card.Body>
    </Card>
        </div>

      );
    }

    export default ArtistCard;