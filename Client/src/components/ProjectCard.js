import { Link } from "react-router-dom";
import {useContext} from "react"


function ProjectCard({ title, description, _id }) {

  
    return (
        <div className={"ProjectCard card"}>                 
          <Link to={`/events/${_id}`} eventDetails = {title}>
            <h3>{title}</h3>
          </Link>
          <p style={{ maxWidth: "400px" }}>Description: {description} </p>
        </div>
      );
    }

    export default ProjectCard;