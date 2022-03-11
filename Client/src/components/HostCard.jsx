import { Link } from "react-router-dom";



function ArtistCard({ name, description, _id, profilePic  }) {

  
    return (
        <div className={"ProjectCard card"}>
         
          <Link to={`/hosts/${_id}`} eventDetails = {title}>
            <h3>{title}</h3>
          </Link>
          <p style={{ maxWidth: "400px" }}>Description: {description} </p>

        </div>
      );
    }

    export default ArtistCard;