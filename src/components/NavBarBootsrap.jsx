import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavBarBootrstrap() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  // console.log("user =>",user, "isloggin >>>",isLoggedIn);

  let host = false;
  let artist = false;
  if (user) {
    host = user.isHost;
    artist = !user.isHost;
  }

  return (
    <div>
    <Navbar collapseOnSelect expand="lg" className="background" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h1 className="findaGig" >findaGig</h1> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {host && (
              <>
                <Nav.Link as={Link} to={`/profileHost/${user._id}`}>
                  Profile
                </Nav.Link>

                <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
              </>
            )}

            {artist && (
              <>
                <Nav.Link as={Link} to={`/profileArtist/${user._id}`}>
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to={`/profileArtist/${user._id}/artistMessages`}>
                  Messages
                </Nav.Link>
                <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
        {!user &&(
        <>
            <Nav.Link as={Link} to="/signup">
              SignUp
            </Nav.Link>

            <Nav.Link as={Link} to="/login">
            Login
            </Nav.Link>
        </>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}
