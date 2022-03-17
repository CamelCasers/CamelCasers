import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";


function EventCard(props) {

  const {_id, title, date, location, images, videos, musicStyle, description, timeRange, equipment, host } = props
  
   let day = date?.slice(8,10)
   let month = date?.slice(5,7)
   let year = date?.slice(0,4)

    return (
      <Container>
      <div className="centerItemsContainer lessMargin">
        <div className="centerItemsContainer backgroundEventCard text-white" style={{ width: "20rem" }}  >
          <Card.Title>{day}/{month}/{year}</Card.Title>
          <Card.Img variant="top" src={images[0]} style={{}}/>
          <Card.Body>         
            <Card.Title>{title}</Card.Title>
            <Card.Text>Music Style: {musicStyle}</Card.Text>
            <Card.Text>Address: {location}</Card.Text>
            
            <Link to={`/events/${_id}`}>
            <button className="btn btn-outline-warning ">
              See Details
            </button>
            </Link>
            
          </Card.Body>
          
        </div>       
      </div>
    </Container>
      );
    }

    export default EventCard;