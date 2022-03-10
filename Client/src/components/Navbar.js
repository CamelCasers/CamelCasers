import HomePage from "../pages/HomePage";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";



function Navbar() {


  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  // console.log("user =>",user, "isloggin >>>",isLoggedIn);

  
  return (
    
<nav className={"navBar"}>
      <Link to={`/`}>
        <h3>Go Home</h3>
      </Link>

      {user && (
        <>
          <Link to={`/profile/${user._id}`}>
            <button>profile</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!user && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
      </nav> 
  );
}

export default Navbar;
