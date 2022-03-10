import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

export default function HostProfilePage(props) {
  const [host, setHost] = useState({
    name: "",
    email: "",
  });

  const { profileId } = useParams();

  function getHost() {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/hosts/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
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

  return (
    <div>
      I'm a host asdasdasd
     <p>{host.name}</p>
    </div>
  );
}
