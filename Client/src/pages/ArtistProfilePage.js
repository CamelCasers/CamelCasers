import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import YoutubeUpload from "../components/YoutubeUpload";
import ImagesCarrousel from "../components/ArtistProfile/ImagesCarrousel";
import Image from "../components/ArtistProfile/Image.jsx";
import { Button } from "react-bootstrap";

const API_URL = "http://localhost:5005";

export default function ArtistProfilePage(props) {
  const { user } = useContext(AuthContext);
  const [artist, setArtist] = useState({
    name: "",
    email: "",
    profilePic: {},
    musicStyle: [],
    images: [],
    videos: [],
  });
  const [videosFiltered, setVideosFiltered] = useState([]);

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
  if (user) {
    if (profileId === user._id) isArtistOwner = true;
  }

  useEffect(() => {
    const videosfilt = artist.videos.filter((video) => {
      return video !== null;
    });
    setVideosFiltered(videosfilt);
  }, [artist.videos]);

  console.log(videosFiltered);

  return (
    <div className="centerItemsContainer container">
      <div className="profileArtistHeader">
        <h1>{artist.name}</h1>
        <div className="profileArtistHeaderTitle">
          <img
            className="profile-img"
            style={{ maxWidth: "200px" }}
            src={artist.profilePic}
            alt="pic"
          />
          <div className="artistMusicStyles">
            <p>Music Styles:</p>
            {artist.musicStyle?.map((styles) => (
              <li className="musicStyleColor">{styles}</li>
            ))}
          </div>
        </div>
        <h5>About Me</h5>
        <p className="text-center ">{artist.description}</p>
        <div className="profileArtistButtons">
          {isArtistOwner && (
            <>
              <Link to={`/profileArtist/${user._id}/edit`}>
                <button className="btn btn-outline-warning btn-sm">
                  Edit profile
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="videos">
        {/*<ImagesCarrousel artist={artist} />*/}

        {videosFiltered.map((video) => (
          <YoutubeUpload embedId={video} />
        ))}
      </div>
    </div>
  );
}
