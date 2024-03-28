import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";
const Login = (props) => {
  console.log("Hi");
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      console.log(Auth.getProfile());
      window.location.replace("/tasks");
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <div className="login-form-div">
      <div className="login-banner-container">
        <div className="banner">
          <img src="./Pics/login-pic.jpg" alt="planner"></img>
        </div>
        <div className="welcome-div">
          <h1>Welcome Back</h1>
          <p>
            It's great to have you here again. Let's accomplish a lot today!
            Create the tasks and let us handle the rest, we have your back.
          </p>
        </div>
        <div className="login-banner login-stack-top">
          <form className="login-form">
            <h4 className="login-heading">Login</h4>
            <input
              type="text"
              name="email"
              placeholder="Email"
              id="username-email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password-login"
              value={formState.password}
              onChange={handleChange}
              required
            />
            {error && <div className="error">{error.message}</div>}
            <input type="submit" onClick={handleFormSubmit} />
            <p>
              <span>
                {" "}
                Don't have an account?&nbsp;<a href="/signup">Sign up</a>{" "}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
