import { Link } from "react-router-dom";


function EventCard(props) {

  const {_id, title, date, location, images, videos, musicStyle, description, timeRange, equipment, host } = props
console.log(host)
    return (
        <div className={"EventCard card"}>      

          <Link to={`/events/${_id}`} eventDetails = {title}>
            <h3>Event Name: {title}</h3>
          </Link>
          {host && (
          <p style={{ maxWidth: "400px" }}>Event host: {host.name} </p>

          )}
          <p style={{ maxWidth: "400px" }}>Date: {date} </p>
          <p style={{ maxWidth: "400px" }}>Location: {location} </p>
          <p style={{ maxWidth: "400px" }}>Image: {images} </p>
          
        </div>
      );
    }

    export default EventCard;