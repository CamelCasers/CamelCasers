import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";


const API_URL = "http://localhost:5005";

export default function ArtistListPage(){


    const storedToken = localStorage.getItem("authToken");
    const [artists, setArtist] = useState([])

    function getAllArtists() {
        axios
          .get(`${API_URL}/api/artists/`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          })
          .then((response) => {
            setArtist(response.data)
            
          })
          .catch((error) => console.log(error));
      }
    
      useEffect(() => {
        getAllArtists();
      }, []);


    return(

        <div>
            {artists.map((artist)=>(
                <ProjectCard key={artist._id} {...artist} />
            ))}

        </div>

    )
}