// src/pages/HomePage.js
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"; 


function HomePage() {
  const {loggedHost, loggedArtist,logOutUser} = useContext(AuthContext)


    return (

      
      <div>
      {loggedHost && <h1> HOST IN DA HAUSE</h1>}

      
      {loggedArtist && <h1> Artist IN DA HAUSE</h1>}
      

        <h1>Home Page</h1>
      </div>
    );
  }
  
  export default HomePage;
  