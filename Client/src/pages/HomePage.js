// src/pages/HomePage.js
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"; 
import { Link } from "react-router-dom";



function HomePage() {
  const {loggedHost, loggedArtist} = useContext(AuthContext)


    return (

      
      <div>
      {loggedHost && <h1> HOST IN DA HAUSE</h1>}

      {loggedHost && 
          <Link to={`/createEvent/`}>
            <button>Create Event</button>
          </Link>}

          


      
      {loggedArtist && <h1> Artist IN DA HAUSE</h1>
      }

        <h1>Home Page</h1>
      </div>
    );
  }
  
  export default HomePage;
  