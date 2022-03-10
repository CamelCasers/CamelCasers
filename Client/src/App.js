import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";  
import IsAnon from "./components/IsAnon";  
import { AuthContext } from "./context/auth.context";
import ArtistProfilePage from "./pages/ArtistProfilePage"
import HostProfilePage from "./pages/HostProfilePage"



function App() {
  const {loggedHost, loggedArtist} = useContext(AuthContext)
  return (
    <div>
      {/*  ADD <Navbar>, <Routes> & <Route>  */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" 
        element={<IsPrivate> <ProjectListPage /> </IsPrivate>}/>
        <Route path="/projects/edit/:projectId" element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />

      {loggedHost && 
        <Route path="/profile" element={<IsPrivate> <HostProfilePage /> </IsPrivate>}/>
      }

      {loggedArtist && 
        <Route path="/profile" element={<IsPrivate> <ArtistProfilePage/> </IsPrivate>}/>
      }

        <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon> } />
        <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />
      </Routes>
    </div>
  );
}

export default App;
