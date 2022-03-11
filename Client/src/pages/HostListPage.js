import { useEffect, useState } from "react";
import axios from "axios";
import HostCard from "../components/HostCard";


const API_URL = "http://localhost:5005";

export default function HoststListPage(){


    const storedToken = localStorage.getItem("authToken");
    const [hosts, setHost] = useState([])

    function getAllHost() {
        axios
          .get(`${API_URL}/api/hosts/`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          })
          .then((response) => {
            setHost(response.data)
            
          })
          .catch((error) => console.log(error));
      }
    
      useEffect(() => {
        getAllHost();
      }, []);


    return(

        <div>
            <h1>Host List</h1>
            {hosts.map((host)=>(
                <HostCard key={host._id} {...host} />
            ))}

        </div>

    )
}