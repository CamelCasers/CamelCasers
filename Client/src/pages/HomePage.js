// src/pages/HomePage.js
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function HomePage() {
  const { loggedHost, loggedArtist, logOutUser } = useContext(AuthContext);

  return (
    <div>
      {loggedHost && <h1> HOST IN DA HAUSE</h1>}

      <Link to={`/events/`}>
      <button>Events</button>
      </Link>
      <hr/>

      <Link exact to={"/hostList"}> 
      <button>Host</button>
      </Link>
      <hr/>

      <Link exact to={"/artistList"}> 
      <button>Artist</button>
      </Link>
      <hr/>

    


      {loggedArtist && <h1> Artist IN DA HAUSE</h1>}
    </div>
  );
}

export default HomePage;
