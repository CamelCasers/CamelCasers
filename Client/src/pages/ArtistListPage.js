import { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";


const API_URL = "http://localhost:5005";

export default function ArtistListPage(){


   
    const [artists, setArtist] = useState([])

    function getAllArtists() {
        axios
          .get(`${API_URL}/api/artists/`
          )
          .then((response) => {
            setArtist(response.data)
            
          })
          .catch((error) => console.log(error));
      }
    
      useEffect(() => {
        getAllArtists();
      }, []);


    return(

        <div className="centerItemsContainer">

            {artists.map((artist)=>(
                <ArtistCard key={artist._id} {...artist} />
            ))}

        </div>  

    )
}