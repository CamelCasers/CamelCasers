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
import HostListPage from "./pages/HostListPage";
import ArtistMessagesPage from "./pages/ArtistMessagesPage";
import ArtistListPage from "./pages/ArtistListPage";
import MyEventsListPage from "./pages/MyEventsListPage";
import NavBarBootrstrap from "./components/NavBarBootsrap";
import {Container} from "react-bootstrap"


function App() {
  const { loggedHost, loggedArtist } = useContext(AuthContext);
  return (
    <Container>
  
      
      <NavBarBootrstrap/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/myEvents" element={<MyEventsListPage />} />
        <Route path="/events/create" element={<CreateEventPage />} />
        <Route path="/events/:eventId" element={<IsPrivate>
              {" "}
              <EventDetailsPage />{" "}
            </IsPrivate>} />
        <Route path="/events/edit/:eventId" element={<EditEventPage />} />

        <Route path="/hostList" element={<HostListPage />} />
        <Route path="/artistList" element={<ArtistListPage />} />

        <Route path="/profileHost/:profileId" element={<IsPrivate>
              {" "}
              <HostProfilePage />{" "}
            </IsPrivate>} />
            
        <Route path="/profileHost/:profileId/edit" element={<HostFormPage />} />

        <Route path="/profileArtist/:profileId/artistMessages" element={<ArtistMessagesPage />} />

        <Route path="/profileArtist/:profileId/edit" element={<ArtistFormPage />} />
        
        <Route
          path="/profileArtist/:profileId"
          element={
            <IsPrivate>
              {" "}
              <ArtistProfilePage />{" "}
            </IsPrivate>
          }
        />

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
    </Container>
  );
}

export default App;
