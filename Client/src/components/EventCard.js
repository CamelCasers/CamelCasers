import { Link } from "react-router-dom";


function EventCard(props) {

  const {_id, title, date, location, images, videos, musicStyle, description, timeRange, equipment, host } = props

    return (
        <div className={"EventCard card"}>      

          <Link to={`/events/${_id}`} eventDetails = {title}>
            <h3>Event Name: {title}</h3>
          </Link>
          <p style={{ maxWidth: "400px" }}>Host: {host.name} </p>
          <p style={{ maxWidth: "400px" }}>Date: {date} </p>
          <p style={{ maxWidth: "400px" }}>Location: {location} </p>
          <p style={{ maxWidth: "400px" }}>Images: {images} </p>
          
        </div>
      );
    }

    export default EventCard;