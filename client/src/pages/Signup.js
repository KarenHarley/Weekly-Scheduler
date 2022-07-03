import React, { useState } from "react";
import { useMutation } from "@apollo/client";
//import { SIGNUP_USER } from "../../../utils/mutations";

const Signup = (props) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [signup, { error, data }] = useMutation(LOGIN_USER);

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

      Auth.login(data.signup.token);
      window.location.replace(`/tasks/${id}`); //get id from data
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
    <div class="user-form">
      <h1>Sign Up</h1>
      <form>
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
          Have have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};
export default Signup;
