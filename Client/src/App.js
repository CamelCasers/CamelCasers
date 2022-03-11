import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventListPage from "./pages/EventListPage";
import EditEventPage from "./pages/EditEventPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import { AuthContext } from "./context/auth.context";
import ArtistProfilePage from "./pages/ArtistProfilePage";
import HostProfilePage from "./pages/HostProfilePage";
import CreateEventPage from "./pages/CreateEventPage";
import HostFormPage from "./pages/HostFormPage";
import ArtistFormPage from "./pages/ArtistFormPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import HostListPage from "./pages/HostListPage"
import ArtistListPage from "./pages/ArtistListPage"

function App() {
  const { loggedHost, loggedArtist } = useContext(AuthContext);
  return (
    <div>
      {/*  ADD <Navbar>, <Routes> & <Route>  */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/events/create" element={<CreateEventPage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/events/edit/:eventId" element={<EditEventPage />} />

        <Route path="/hostList" element={<HostListPage />} />
        <Route path="/artistList" element={<ArtistListPage />} />
        
        {loggedHost && (
          <Route path="/profile/:profileId" element={<HostProfilePage />} />
        )}

        {loggedHost && (
          <Route path="/profile/:profileId/edit" element={<HostFormPage />} />
        )}

        {loggedArtist && (
          <Route path="/profile/:profileId/edit" element={<ArtistFormPage />} />
        )}

        {loggedArtist && (
          <Route
            path="/profile/:profileId"
            element={
              <IsPrivate>
                {" "}
                <ArtistProfilePage />{" "}
              </IsPrivate>
            }
          />
        )}

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
