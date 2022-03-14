// src/pages/HomePage.js
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Container className="centerItemsContainer">
        <h1 className="centerText text-white ">
          A place for artists and venues to connect
        </h1>
      </Container>

      <Container className="centerItemsContainer artistContainer">
        <h1 className="wordHomePage ">Artists</h1>
        <h2 className="centerText text-white h2HomePage">
          Leverage your fanbase to book your gigs.
        </h2>
        <p className="centerText pHomePage text-white">
          Scroll through our AI-generated recommendations for venues and events.
          Request a gig and use our campaign generator to leverage your fanbase.
        </p>
        <Link exact to={"/artistList"} className="center">
          <Button className="backgroundPink">Search Artists</Button>
        </Link>
        <hr />
      </Container>

      <Container className="centerItemsContainer ">
        <h1 className="centerText wordHomePage">Hosts</h1>
        <h1 className="centerText text-white">
          Use our data to make sound booking decisions.
        </h1>
        <p className=" centerText pHomePage text-white">
          Book artists or post events with help from our AI-generated
          recommendations.
        </p>

        <Link exact to={"/hostList"}>
          <Button className="backgroundPink">Search Hosts</Button>
        </Link>
        <hr />
      </Container>

      <Container className="centerItemsContainer">
        <h1 className="centerText wordHomePage">Events</h1>
        <h1 className="centerText text-white">
          Support your favourite artist in scoring that gig.
        </h1>
        <p className="centerText text-white">
          Make donations to your favorite artists campaigns in the app. See when
          they re playing shows.
        </p>
        <Link to={`/events/`}>
          <Button className="backgroundPink">Search Events</Button>
        </Link>
        <hr />
      </Container>

      {/* {loggedHost && <h1> HOST IN DA HAUSE</h1>} */}
    </div>
  );
}

export default HomePage;
