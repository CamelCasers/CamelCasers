import { Link } from "react-router-dom";



function ArtistCard(props) {

const {name, profilePic, images, videos, musicStyle, description, playlist, events, _id
} = props
  
    return (
        <div className="card">                 
     
          <img src={profilePic} className="card-img-top" alt="Pic"/>
          <div class="card-body">
          <Link to={`/profileArtist/${_id}`} artistDetails = {name}>
          <h3>{name}</h3>
          </Link>  
          <p style={{ maxWidth: "400px" }}>Description: {description} </p>
          <p style={{ maxWidth: "400px" }}>Music Style: {musicStyle} </p>
          </div>
        </div>
      );
    }

    export default ArtistCard;