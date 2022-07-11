import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";
const Login = (props) => {
  console.log("Hi");
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      //   window.location.replace("/lista_contacto");
      console.log(Auth.getProfile());
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
    <div className="user-form">
      <h1>Login</h1>
      <form>
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
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
      {error && <div className="error">{error.message}</div>}
    </div>
  );
};
export default Login;
