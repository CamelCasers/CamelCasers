// src/pages/HomePage.js
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap"

function HomePage() {
  const { loggedHost, loggedArtist, logOutUser } = useContext(AuthContext);

  return (
    <div className="backgroundGrey ">
      <h1 className="centerText text-white">
        A place for artists and venues to connect
      </h1>


      
      <h1 className="centerText text-white">
        Leverage your fanbase to book your gigs.
      </h1>
      <p className="centerText text-white">
        Scroll through our AI-generated recommendations for venues and events.
        Request a gig and use our campaign generator to leverage your fanbase.
        The more fans support you the more successful your gig will be, and more
        gigs will come your way!
      </p>
      <Link exact to={"/artistList"} className="center">
        <Button className="backgroundPink">Search Artists</Button>
      </Link>
      <hr />

      <h1 className="centerText text-white">Venues</h1>
      <h1 className="centerText text-white">
        Use our data to make sound booking decisions.
      </h1>
      <p className="centerText text-white">
        Book artists or post events with help from our AI-generated
        recommendations. Receive relevant data at a glance, including artist
        profiles, number of fans, where the artist and fans are located, and how
        many gigs the artist has played. No more weeding through e-mail inboxes
        and social media profiles, but solid data for solid decision making.
      </p>

      <h1 className="centerText text-white">Events</h1>
      <h1 className="centerText text-white">
        Support your favourite artist in scoring that gig.
      </h1>
      <p className="centerText text-white">
        Make donations to your favorite artists’ campaigns in the app. See when
        they’re playing shows. Gain access to exclusive artist content and
        merchandise.
      </p>

      {/* {loggedHost && <h1> HOST IN DA HAUSE</h1>} */}

      <Link to={`/events/`}>
      <Button className="backgroundPink">Search Hosts</Button>
      </Link>
      <hr />

      <Link exact to={"/hostList"}>
      <Button className="backgroundPink">Search Events</Button>
      </Link>
      <hr />

      {loggedArtist && <h1> Artist IN DA HAUSE</h1>}
    </div>
  );
}

export default HomePage;
