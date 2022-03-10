import { Link } from "react-router-dom";
import {useContext} from "react"


function ProjectCard({ title, description, _id }) {

  
    return (
        <div className={"ProjectCard card"}>
         

        
          <Link to={`/projects/${_id}`}>
            <h3>{title}</h3>
          </Link>
          <p style={{ maxWidth: "400px" }}>Description: {description} </p>
        </div>
      );
    }

    export default ProjectCard;