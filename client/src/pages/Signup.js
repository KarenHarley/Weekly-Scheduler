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
      alert("This email was already found in the database");
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
      username: "",
    });
  };
  return (
    <div class="signup-form-div">
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
        <input type="submit" onClick={handleFormSubmit} />
        <p>
          <span>Have have an account? &nbsp; </span> <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};
export default Signup;
