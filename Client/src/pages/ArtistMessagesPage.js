import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";



const API_URL = "http://localhost:5005";
export default function ArtistMessagesPage() {
  const { user } = useContext(AuthContext);
  const { profileId } = useParams();
  const [artist, setArtist] = useState({
    name: "",
    email: "",
    profilePic: {},
    musicStyle: [],
    images: [],
    videos: [],
    events: [],
    pendingEvents: []
  });
  const storedToken = localStorage.getItem("authToken");
  function getArtist() {
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
  return (
      <div>
          <p>{artist.name}</p>
      </div>
  )
}
