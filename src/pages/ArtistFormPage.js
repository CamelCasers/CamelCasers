import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUpload from "../components/CloudinaryUpload";
import YoutubeUpload from "../components/YoutubeUpload";



export default function ArtistFormPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [profilePic, setProfilePic] = useState("");
  const [location, setLocation] = useState("");
  const [videos, setVideos] = useState("");
  const [musicStyle, setMusicStyle] = useState("");
  const [images, setImages] = useState([]);

  const [video1, setVideo1] = useState(videos[0]);
  const [video2, setVideo2] = useState(videos[1]);
  const [video3, setVideo3] = useState(videos[2]);

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
        setLocation(artist.location)
        setDescription(artist.description);
        setImages(artist.images);
        setProfilePic(artist.profilePic);
        setVideos(artist.videos);
        handleMultiple()
      })
      .catch((error) => console.log(error));
  }, [profileId]);

  const handleMultiple = (e) => {
    var options = e.target.options;
    var value = [];
    
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setMusicStyle(value);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = {
      name,
      location,
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
      //setImages(images.concat(url));
      setProfilePic(url);
    }
  }

  function handleVideos1(e) {
    let videoLong = e.target.value;
    let videoEmbed = videoLong.slice(
      videoLong.indexOf("watch?v=") + 8,
      videoLong.indexOf("watch?v=") + 19
    );
    // let copyVideos = videos.slice().splice(2,1,videoEmbed)
    // // copyVideos.push("")
    // copyVideos.push("")
    // copyVideos.push("")
    setVideo1(videoEmbed);
  }
  function handleVideos2(e) {
    let videoLong = e.target.value;
    let videoEmbed = videoLong.slice(
      videoLong.indexOf("watch?v=") + 8,
      videoLong.indexOf("watch?v=") + 19
    );
    //  let copyVideos = videos.slice().splice(2,1,videoEmbed)
    // copyVideos.push("")
    // copyVideos.push("")
    // copyVideos.push("")
    setVideo2(videoEmbed);
  }
  function handleVideos3(e) {
    let videoLong = e.target.value;
    let videoEmbed = videoLong.slice(
      videoLong.indexOf("watch?v=") + 8,
      videoLong.indexOf("watch?v=") + 19
    );
    // let copyVideos = videos.slice().splice(2,1,videoEmbed)
    // copyVideos.push("")
    // copyVideos.push("")
    // copyVideos.push("")
    setVideo3(videoEmbed);
  }
  function delete1(e) {
    e.preventDefault();
    setVideo1("");
  }
  function delete2(e) {
    e.preventDefault();
    setVideo2("");
  }
  function delete3(e) {
    e.preventDefault();
    setVideo3("");
  }

  useEffect(() => {
    setVideos([video1, video2, video3]);
  }, [video1, video2, video3]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Name:</label>
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
          <label className="col-sm-2 col-form-label">Location:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              multiple={true}
              type="text"
              name="musicStyles"
              value={musicStyle}
              onChange={handleMultiple}
            >
              <option value="rock">Rock</option>
              <option value="reggae">Reggae</option>
              <option value="Pop">Pop</option>
              <option value="romantic">Romantic</option>
              <option value="party">Party</option>
              <option value="swing">Swing</option>
              <option value="heavy">Heavy</option>
              <option value="chill">Chill</option>
              <option value="classic">Classic</option>
              <option value="jazz">Jazz</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>

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

       {/*  <div className="mb-3">
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
        </div>*/}
        <label>Youtube video links:</label>
        <br />
        <input
          type="text"
          name="videos"
          value={video1}
          onChange={handleVideos1}
        />
        <br />
        {videos[0] !== "" && <YoutubeUpload embedId={videos[0]} />}

        <button onClick={delete1}>Delete 1</button>
        <br />
        <input
          type="text"
          name="videos"
          value={video2}
          onChange={handleVideos2}
        />
        <br />

        {videos[1] !== "" && <YoutubeUpload embedId={videos[1]} />}

        <button onClick={delete2}>Delete 2</button>
        <br />
        <input
          type="text"
          name="videos"
          value={videos[2]}
          onChange={handleVideos3}
        />
        <br />
        {videos[2] !== "" && <YoutubeUpload embedId={videos[2]} />}
        <button onClick={delete3}>Delete 3</button>

        <button className="btn btn-secondary" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}
