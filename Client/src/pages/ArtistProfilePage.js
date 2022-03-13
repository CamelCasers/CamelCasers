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
    musicStyle: [],
    images: []
  });

  const { profileId } = useParams();

  function getArtist() {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/artists/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
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

  let isArtistOwner = false;
  if(user){

    if (profileId === user._id) isArtistOwner = true;

  }

  return (
    <div>
      <h2>Welcome, {artist.name}</h2>
  
      <img src={artist.profilePic} className="profile-img" alt="Pic" width={150}/>
      <p>Artist Images</p>

      <p>Description: {artist.description}</p>
      <p>Music Style: {artist.musicStyle}</p>

      {/*{artist.musicStyle.map((styles) => (
        <li>{styles}</li>
      ))}*/}

      {artist.images.map((img)=>(
      <img src={img} alt="pic" width={300} />
      ))}

      {isArtistOwner && (
        <Link to={`/profileArtist/${user._id}/edit`}>
          <button>Edit Profile</button>
        </Link>
      )}
    </div>
  );
}
