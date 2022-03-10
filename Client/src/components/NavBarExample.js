
<nav className={"navBar"}>
      <Link to={`/`}>
        <h3>Go Home</h3>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/profile">
            <button>profile</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
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