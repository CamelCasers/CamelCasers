import { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import Search from "../components/Search";

const API_URL = "http://localhost:5005";

export default function ArtistListPage() {
  const [artists, setArtist] = useState([]);
  const [artistsData, setArtistData] = useState([]);

  function getAllArtists() {
    axios
      .get(`${API_URL}/api/artists/`)
      .then((response) => {
        setArtist(response.data);
        setArtistData(response.data);
      })
      .catch((error) => console.log(error));
  }
  function filterEvents(eventSearch) {
    setArtist(
      artistsData.slice().filter((elem) => {
        return elem?.name?.toLowerCase().includes(eventSearch?.toLowerCase());
      })
    );
  }

  function filterEventsLoc(eventSearch) {
    setArtist(
      artistsData.slice().filter((elem) => {
        return elem?.location
          ?.toLowerCase()
          .includes(eventSearch?.toLowerCase());
      })
    );
  }

  function filterEventsMusic(eventSearch) {
    setArtist(
      artistsData.slice().filter((elem) => {
        return elem?.musicStyle?.includes(eventSearch[0]);
      })
    );
    if (eventSearch.length === 0) setArtist(artistsData);
  }

  useEffect(() => {
    getAllArtists();
  }, []);

  return (
    <div className="centerItemsContainer">
      <Search
        filterEvents={filterEvents}
        filterEventsLoc={filterEventsLoc}
        filterEventsMusic={filterEventsMusic}
        noMusic={true}
      />
      {artists.map((artist) => (
        <ArtistCard key={artist._id} {...artist} />
      ))}
    </div>
  );
}
