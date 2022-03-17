// src/pages/HomePage.js
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">

      <div className=" margenesHomePage eventContainer centerItemsContainer">
       {/* <h1 className="centerText wordHomePage">Events</h1> */}
        <h2 className="centerText text-white">
          Find your Gig
        </h2>
        <Link to={`/events/`}>
          <button className="btn btn-outline-warning mt-2">Events</button>
        </Link>


      </div>

      <div className="margenesHomePage centerItemsContainer artistContainer">
        {/*<h1 className="wordHomePage ">Artists</h1>*/}
        <h2 className="centerText text-white">
          Find the Artist
        </h2>
        <Link exact to={"/artistList"} className="center">
          <button className="btn btn-outline-warning  mt-2">Artists</button>
        </Link>
 

      </div>

      <div className="margenesHomePage centerItemsContainer hostContainer">
        <h2 className="centerText text-white">
          Find the Host
        </h2>

        <Link exact to={"/hostList"}>
          <button className="btn btn-outline-warning mt-2">Hosts</button>
        </Link>

      </div>


      {/* {loggedHost && <h1> HOST IN DA HAUSE</h1>} */}
    </div>
  );
}

export default HomePage;
