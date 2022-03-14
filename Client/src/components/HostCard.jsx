import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";

function HostCard(props) {
  const { name, profilePic, description, location, events, _id, title } = props;

  return (
    <Container>
      <div className="centerItemsContainer">
        <Card style={{ width: "18rem" }}  className="backgroundMiki text-white centerItemsContainer">
          <Card.Img variant="top" src={profilePic} className="rounded mx-auto d-block"/>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <form action={`/profileHost/${_id}`}>
            <button className="btn btn-outline-warning">
              Go to Profile
            </button>
            </form>
          </Card.Body>
          
        </Card>
        <br/>
        
      </div>
    </Container>

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
