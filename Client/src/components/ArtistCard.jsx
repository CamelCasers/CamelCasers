import { Link } from "react-router-dom";



function ArtistCard(props) {

const {name, profilePic, images, videos, musicStyle, description, playlist, events, _id
} = props
  
    return (
        <div className={"ProjectCard card"}>
         

        
          <Link to={`/profileArtist/${_id}`} artistDetails = {name}>
            <h3>{name}</h3>
          </Link>
          <p style={{ maxWidth: "400px" }}>Description: {description} </p>
        </div>
      );
    }

    export default ArtistCard;