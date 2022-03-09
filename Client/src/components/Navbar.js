import HomePage from "../pages/HomePage";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import * as Bootstrap from "react-bootstrap";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Bootstrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Bootstrap.Container>
        <Link to={"/"}>
          {" "}
          <Bootstrap.Navbar.Brand>Camelcasers</Bootstrap.Navbar.Brand>
        </Link>
        <Bootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Bootstrap.Navbar.Collapse id="responsive-navbar-nav">
          <Bootstrap.Nav className="me-auto">
            {isLoggedIn && (
              <>
                <Link to="/projects">
                {" "}
                  <Bootstrap.Nav.Link href=".">MyEvents</Bootstrap.Nav.Link>
                </Link>
                <Link to="/projects">
                {" "}
                  <Bootstrap.Nav.Link href=".">Messages</Bootstrap.Nav.Link>
                </Link>
                <Bootstrap.Nav.Link onClick={logOutUser}>
                  Logout
                </Bootstrap.Nav.Link>
              </>
            )}

            <Bootstrap.NavDropdown
              title="Dropdown"
              id="collasible-nav-dropdown"
            >
              <Bootstrap.NavDropdown.Item href="#action/3.1">
                Action
              </Bootstrap.NavDropdown.Item>
              <Bootstrap.NavDropdown.Item href="#action/3.2">
                Another action
              </Bootstrap.NavDropdown.Item>
              <Bootstrap.NavDropdown.Item href="#action/3.3">
                Something
              </Bootstrap.NavDropdown.Item>
              <Bootstrap.NavDropdown.Divider />
              <Bootstrap.NavDropdown.Item href="#action/3.4">
                Separated link
              </Bootstrap.NavDropdown.Item>
            </Bootstrap.NavDropdown>
          </Bootstrap.Nav>

          <Bootstrap.Nav>
            {!isLoggedIn && (
              <>
                <Link to="/signup">
                  {" "}
                  <Bootstrap.Nav.Link eventKey={2} href=".">
                    Sing Up
                  </Bootstrap.Nav.Link>
                </Link>

                <Link to="/login">
                  <Bootstrap.Nav.Link href=".">Log In</Bootstrap.Nav.Link>{" "}
                </Link>
              </>
            )}
          </Bootstrap.Nav>
        </Bootstrap.Navbar.Collapse>
      </Bootstrap.Container>
    </Bootstrap.Navbar>
  );
}

export default Navbar;
