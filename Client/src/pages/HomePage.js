// src/pages/HomePage.js
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function HomePage() {
  const { loggedHost, loggedArtist, logOutUser } = useContext(AuthContext);

  return (
    <div>
      {loggedHost && <h1> HOST IN DA HAUSE</h1>}

      {loggedHost && (
        <Link to={`/events/`}>
          <button>Events</button>
        </Link>
      )}
      {loggedHost && (
        <Link to={`/events/create`}>
          <button>Create Event</button>
        </Link>
      )}

      <Link exact to={"/hostList"}> 
      <button>Host</button>
      </Link>

      <Link exact to={"/artistList"}> 
      <button>Artist</button>
      </Link>



      {loggedArtist && <h1> Artist IN DA HAUSE</h1>}

      <h1>Home Page</h1>
    </div>
  );
}

export default HomePage;
