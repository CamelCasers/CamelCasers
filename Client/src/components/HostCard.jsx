import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function HostCard(props) {
  const { name, profilePic, description, location, events, _id, title } = props;

  return (


    <Card style={{ width: "18rem" }} className="backgroundGrey text-white">
      <Card.Img variant="top" src={profilePic} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
        {description}
        </Card.Text>
        <Button variant="primary" as={Link} to= {`/profileHost/${_id}`}>Details</Button>
      </Card.Body>
    </Card>

    
    // <div className={"ProjectCard card"}>

    //   <Link to={`/profileHost/${_id}`} hostDetails = {name}>
    //     <h3>{name}</h3>
    //   </Link>
    //   <img src={profilePic} className="profile-img" alt="Pic" />
    //   <p style={{ maxWidth: "400px" }}>Description: {description} </p>

    // </div>
  );
}

export default HostCard;
