import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";


function EventCard(props) {

  const {_id, title, date, location, images, videos, musicStyle, description, timeRange, equipment, host } = props
//console.log(host)
    return (
      <Container>
      <div className="centerItemsContainer">
        <Card style={{ width: "20rem" }}  className="backgroundMiki text-white centerItemsContainer">
          <Card.Img variant="top" src={images[0]} className="rounded mx-auto d-block"/>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>Address: {location}</Card.Text>
            <Card.Text>Music Style: {musicStyle}</Card.Text>
            <Button variant="primary" as={Link} to={`/profileHost/${_id}`}>
              Details
            </Button>
          </Card.Body>
          
        </Card>
        <br/>
        
      </div>
    </Container>
      );
    }

    export default EventCard;