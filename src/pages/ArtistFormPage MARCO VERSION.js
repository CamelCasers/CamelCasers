import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUpload from "../components/CloudinaryUpload";
import YoutubeUpload from "../components/YoutubeUpload";



export default function ArtistFormPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [profilePic, setProfilePic] = useState("");
  const [videos, setVideos] = useState([]);
  const [musicStyle, setMusicStyle] = useState([]);
  const [images, setImages] = useState([]);

  // const [video1, setVideo1] = useState("");
  // const [video2, setVideo2] = useState("");
  // const [video3, setVideo3] = useState("");

  // Get the URL parameter `:projectId`

  const navigate = useNavigate();
  const { profileId } = useParams(); // <== ADD
  const storedToken = localStorage.getItem("authToken"); // <== ADD

  // This effect will run after the initial render and each time
  // the project id coming from URL parameter `projectId` changes

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/artists/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const artist = response.data;
        setName(artist.name);
        setDescription(artist.description);
        setMusicStyle(artist.musicStyle);
        setImages(artist.images);
        setProfilePic(artist.profilePic);
        setVideos(artist.videos);
      })
      .catch((error) => console.log(error));
  }, [profileId]);

  const handleFormSubmit = (e) => {
    // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = {
      name,
      description,
      videos,
      musicStyle,
      profilePic,
      images,
    };

    // Make a PUT request to update the project
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/artists/${profileId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/profileArtist/${profileId}`);
      });
  };
  function imgUpload(url) {
    if (url) {
      setImages(images.concat(url));
      setProfilePic(url);
    }
  }

  function handleVideo(e) {
    e.preventDefault();
    const oldVideoCode = e.target.name
    const newVideoCode = e.target.value

    console.log("<<<<<>>>>>>>>>>>>>>>>>>>> old:", oldVideoCode, ">>>> new:",newVideoCode)
    const updatedVideos = videos.slice()

    const videoLink1 = newVideoCode?.split("?v=")[1]?.splice(0, 12)
    const videoLink2 = newVideoCode?.split(".be/")[1]?.splice(0, 12)

    console.log(">>>>>>>>>>", videoLink1 || videoLink2)
    const newVideo = videoLink1 || videoLink2 || oldVideoCode

    updatedVideos.splice(videos.indexOf(oldVideoCode), 1, newVideo)

    setVideos(updatedVideos);
  }

  function deleteVideo(e) {
    e.preventDefault();
    const videoCode = e.target.name
    const updatedVideos = videos.slice()
    updatedVideos.splice(videos.indexOf(videoCode), 1)
    setVideos(updatedVideos);
  }


  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Artist name:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Description:</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Music Style:</label>
          <div className="col-sm-10">
            <select
              className="form-select"
              multiple
              aria-label="multiple select"
              type="text"
              name="musicStyles"
              value={[musicStyle]}
              onChange={(e) => setMusicStyle(e.target.value)}
            >
              <option value="rock">Rock</option>
              <option value="reggae">Reggae</option>
              <option value="pop">Pop</option>
              <option value="romantic">Romantic</option>
              <option value="party">Party</option>
              <option value="swing">Swing</option>
              <option value="heavy">Heavy</option>
              <option value="jazz">Jazz</option>
              <option value="chill">Chill</option>
              <option value="blues">Blues</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>

        {/* <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Videos:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="file"
              name="videos"
              value={videos}
              onChange={(e) => setVideos(e.target.value)}
            />
          </div>
        </div> */}

        <div className="mb-3">
          <label for="formFile" className="form-label">
            {" "}
            Your Profile Picture:{" "}
          </label>
          <CloudinaryUpload
            className="form-control form-control-sm"
            type="file"
            id="formFile"
            imgUpload={imgUpload}
            images={profilePic}
          />
        </div>

        <div className="mb-3">
          <label for="formFile" className="form-label">
            {" "}
            All your Images:{" "}
          </label>
          <div className="col-sm-10">
            <CloudinaryUpload
              className="form-control form-control-sm"
              type="file"
              id="formFile"
              imgUpload={imgUpload}
              images={images}
            />
          </div>
        </div>

        {videos.map((video) => (
          <>
            <label>Youtube video links:</label>
            <br />
            <input
              type="text"
              name= {video}
              value={video}
              onChange={handleVideo}
            />
            <br />
            <YoutubeUpload embedId={video} />
          </>
        ))}

        <button className="btn btn-secondary" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}
