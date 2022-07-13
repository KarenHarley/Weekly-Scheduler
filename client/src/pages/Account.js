import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";
const Account = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [update, { error, data }] = useMutation(UPDATE_USER);

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
      const { data } = await update({
        variables: { ...formState },
      });
     // window.location.replace("/tasks");
    } catch (e) {
      console.error(e);
      alert("Error Updating Account");
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
          <span>Leave Password empty if you would not like it updated</span>
        </p>
      </form>
    </div>
  );
};
export default Account;
