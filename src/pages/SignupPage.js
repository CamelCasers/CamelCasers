import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isHost, setHost] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  let trueOrFalse = false;
  function handleHost(e) {
    if (e.target.value === "true") trueOrFalse = true;
    setHost(trueOrFalse);
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, isHost };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Email:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="email"
              name="email"
              id="inputEmail3"
              placeholder="example@gmail.com"
              value={email}
              onChange={handleEmail}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Password:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="*******"
              value={password}
              onChange={handlePassword}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Name:</label>

          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={handleName}
            />
          </div>
        </div>

        <div className="row mb-3">
        <label className="col-sm-2 col-form-label">User type:</label>
          <div className="col-sm-10">
            <select
              className="form-control-sm"
              onChange={handleHost}
              name="Account Type"
              required
            >
              <option value="" disabled selected hidden>
                Host or Artist?
              </option>
              <option value={true}>Host</option>
              <option value={false}>Artist</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <hr />
      <p>Already have account?</p>

      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
