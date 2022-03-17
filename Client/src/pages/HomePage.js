// src/pages/HomePage.js
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
     {/*} <Container className="centerItemsContainer">
        <h1 className="centerText text-white ">
          Spread the Art
        </h1>
      </Container>*/}

      <hr/>
      <Container className="centerItemsContainer eventContainer">
       {/* <h1 className="centerText wordHomePage">Events</h1> */}
        <h2 className="centerText text-white">
          Find Events and join them:
        </h2>
        {/*<p className="centerText text-white">
          Make donations to your favorite artists campaigns in the app. See when
          they re playing shows.
        </p>*/}
        <Link to={`/events/`}>
          <button className="btn btn-outline-warning">Events</button>
        </Link>
        <hr />
      </Container>

      <Container className="centerItemsContainer artistContainer">
        {/*<h1 className="wordHomePage ">Artists</h1>*/}
        <h2 className="centerText text-white">
          Find your Artist
        </h2>
        {/*<p className="centerText pHomePage text-white">
          Scroll through our AI-generated recommendations for venues and events.
          Request a gig and use our campaign generator to leverage your fanbase.
        </p>*/}
        <Link exact to={"/artistList"} className="center">
          <button className="btn btn-outline-warning">Artists</button>
        </Link>
        <hr />
      </Container>

      <Container className="centerItemsContainer hostContainer">
        <h2 className="centerText text-white">
          Find your Host
        </h2>
        {/*<p className=" centerText pHomePage text-white">
          Book artists or post events with help from our AI-generated
          recommendations.
        </p>*/}

        <Link exact to={"/hostList"}>
          <button className="btn btn-outline-warning">Hosts</button>
        </Link>
        <hr />
      </Container>

      {/* {loggedHost && <h1> HOST IN DA HAUSE</h1>} */}
    </div>
  );
}

export default HomePage;
