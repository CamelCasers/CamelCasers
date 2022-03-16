import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import ImageProfile from "../components/HostProfile/ImageProfile.jsx";



export default function HostProfilePage(props) {
  const { user } = useContext(AuthContext);
  const [host, setHost] = useState({
    name: "",
    email: "",
  });

  const { profileId } = useParams();

  function getHost() {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/hosts/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneHost = response.data;
        setHost(oneHost);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getHost();
  }, []);

  let isHostOwner = false;
  if (profileId === user._id) isHostOwner = true;

  return (
    <div className="centerItemsContainer container">
      <h1>{host.name}</h1>
      <img
        className="profile-img"
        style={{ maxWidth: "200px" }}
        src={host.profilePic}
        alt="pic"
      />
      <h5>{host.location}</h5>

      <h5 className="text-decoration-underline">About Me:</h5>
      <p className="text-center musicStyleColor fw-light ">
        {host.description}
      </p>
      <div className="profileArtistButtons">
        {isHostOwner && (
          <>
            <Link to={`/profileHost/${user._id}/edit`}>
              <button className="btn btn-outline-warning btn-sm ">
                Edit profile
              </button>
            </Link>
            <Link to={`/myEvents`}>
              <button className="btn btn-info"> My Events</button>
            </Link>
          </>
        )}
      </div>

      <br />
    </div>
  );
}
