import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";



const API_URL = "http://localhost:5005";

export default function ArtistProfilePage(props) {

  const { user } = useContext(AuthContext);
  const [artist, setArtist] = useState({
    name: "",
    email: "",
    musicStyle: []
  });

  const { profileId } = useParams();

  function getArtist() {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/artists/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        const oneArtist = response.data;
        setArtist(oneArtist);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getArtist();
  }, []);

console.log(artist.musicStyle);
  

  return (
    <div>

      <h1>Welcome, {artist.name}</h1>
      <p>{artist.description}</p>
      
      {artist.musicStyle.map((styles)=>(
        <li>{styles}</li>
      ))}

      <Link to={`/profile/${user._id}/edit`}>
            <button>Edit Profile</button>
          </Link>

     
    </div>
  );
}
