import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";


function EventCard(props) {

  const {_id, title, date, location, images, videos, musicStyle, description, timeRange, equipment, host } = props
//console.log(host)
    return (
        <div className="backgroundMiki">  
           
         
          {host && (
          <p style={{ maxWidth: "400px" }}>Event host: {host.name} </p>
          )}
          <p style={{ maxWidth: "400px" }}>Date: {date} </p>
          <p style={{ maxWidth: "400px" }}>Location: {location} </p>
          <p style={{ maxWidth: "400px" }}>Location: {title} </p>
          <Link to={`/events/${_id}`} eventDetails = {title}>
            <h3>{title}</h3>
          </Link>
          
          <button  className="btn btn-outline-secondary" as={Link} to={`/events/${_id}`}>
          See Details
            </button>


          {images.map((img)=>(
            <img src={img} alt="Pic" width={300} />))}

         <br/>
          
        </div>
      );
    }

    export default EventCard;