import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
const Signup = (props) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [signup, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await signup({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.addUser.token);
      window.location.replace("/tasks");
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
      username: "",
    });
  };
  return (
    <div className="signup-form-div">
      <div className="signup-banner-container login-banner-container">
        <div className="banner">
          <img src="./Pics/sign-up-pic.jpg"></img>
        </div>
        <div className="welcome-div">
          <h1>Welcome</h1>
          <p>
            It's great to have you here. Let's accomplish a lot today! Create
            the tasks and let us handle the rest, we have your back.
          </p>
        </div>
        <div className="signup-banner login-banner login-stack-top">
          {" "}
          <form className="signup-form">
            <h4 className="signup-heading">Sign Up</h4>
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username-username"
              value={formState.username}
              onChange={handleChange}
              required
            />
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
                Have have an account?&nbsp;<a href="/login">Login</a>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
