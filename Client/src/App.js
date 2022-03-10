import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import EditProjectPage from "./pages/EditProjectPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";  
import IsAnon from "./components/IsAnon";  
import { AuthContext } from "./context/auth.context";
import ArtistProfilePage from "./pages/ArtistProfilePage"
import HostProfilePage from "./pages/HostProfilePage"
import CreateEventPage from "./pages/CreateEventPage";
import HostFormPage from "./pages/HomeFormPage";




function App() {
  const {loggedHost, loggedArtist} = useContext(AuthContext)
  return (
    <div>
      {/*  ADD <Navbar>, <Routes> & <Route>  */}
      <Navbar />

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/projects" 
        element={<IsPrivate> <ProjectListPage /> </IsPrivate>}/>
        <Route path="/projects/edit/:projectId" element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />

      {loggedHost && (
        <Route path="/profile/:profileId" element={ <HostProfilePage /> }/>
      )}

      {loggedHost && (
        <Route path="/createEvent/" element={ <CreateEventPage /> }/>
      )}

      {loggedHost &&
        <Route path="/profile/:profileId/edit" element={ <HostFormPage /> }/>
      }
      

      {loggedArtist && 
        <Route path="/profile/:profileId" element={<IsPrivate> <ArtistProfilePage/> </IsPrivate>}/>
      }

        <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon> } />
        <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />
      </Routes>
    </div>
  );
}

export default App;
