import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const initialState = {
    username: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialState);
  const history = useHistory();

  const error = "";
  //replace with error state
  const [errorState, setErrorState] = useState(error);

  const handleChanges = (e) => {
    // console.log("value: ", e.target.value);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitSignIn = (e) => {
    e.preventDefault();
    validate();

    axios
      .post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        console.log("happy path: ", res.data.payload);
        localStorage.setItem("token", res.data.payload);
        history.push("/private");
      })
      .catch((err) => {
        console.log("sad path: ", err);
      });
  };
  const validate = () => {
    if (
      credentials.username === "Lambda" &&
      credentials.password === "School"
    ) {
      console.log("Nothing to see here.");
    } else {
      setErrorState("Username or Password not valid.");
    }
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
      </div>
      <form>
        <input
          data-testid="username"
          id="username"
          label="username"
          name="username"
          onChange={handleChanges}
        />
        <input
          data-testid="password"
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={handleChanges}
        />
        <button type="submit" id="submit" onClick={submitSignIn}>
          Sign In
        </button>
      </form>
      <p id="error" className="error">
        {errorState}
      </p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display
//the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that
//token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"
