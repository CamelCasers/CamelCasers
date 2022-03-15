import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import ImageProfile from "../components/HostProfile/ImageProfile.jsx"


const API_URL = "http://localhost:5005";

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
      .get(`${API_URL}/api/hosts/${profileId}`, {
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
    <div>
      <h1>Welcome {host.name}</h1>

      <ImageProfile host ={host}/>
      
 
      <p>Descripcion: {host.description}</p>
      <span>Location: {host.location}</span>

      <hr/>

      {isHostOwner && ( 
        <Link to={`/profileHost/${user._id}/edit`}>
          <button>Edit Profile</button>
        </Link>
      )}

      <hr/>

       <Link to={`/myEvents`}>
          <button> {host.name} Events</button>
        </Link>

    </div>
  );
}
