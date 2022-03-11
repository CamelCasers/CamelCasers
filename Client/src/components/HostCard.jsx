import { Link } from "react-router-dom";



function HostCard(props) {

    const {name, profilePic, description, location, events, _id, title} = props
  
    return (
        <div className={"ProjectCard card"}>
         
          <Link to={`/profileHost/${_id}`} hostDetails = {name}>
            <h3>{name}</h3>
          </Link>
          <p style={{ maxWidth: "400px" }}>Description: {description} </p>
          <p style={{ maxWidth: "400px" }}>Image: {profilePic} </p>


        </div>
      );
    }

    export default HostCard;