import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

import Auth from "../utils/auth";
const Account = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { loading, data, refetch } = useQuery(QUERY_USER);
  console.log(data);

  const [update, { updateData }] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: QUERY_USER,
      },
    ],
  });

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
      await update({
        variables: { ...formState },
      });
      // window.location.replace("/tasks");
      // refetch();
      alert("Successfully updated account");
    } catch (e) {
      console.error(e);
      alert("Error Updating Account");
    }
  };

  useEffect(() => {
    if (data) {
      setFormState({
        username: data.user.username,
        email: data.user.email,
        password: "",
      });

      if (updateData) {
        refetch();
      }
    }
  }, [data, updateData]); //add update data
  return (
    <div className="account-form-div create-task-wrapper">
      {loading ? (
        <div className="loading-div">
          <img
            className="loading"
            src={"./Pics/loading-gif.gif"}
            alt="loading..."
          />
        </div>
      ) : (
        <>
          {Auth.loggedIn() ? (
            <form className="account-form create-form">
              <h4 className="acount-heading">Account</h4>
              <input
                type="text"
                name="username"
                placeholder="Username"
                id="username-username"
                value={formState.username || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                id="username-email"
                value={formState.email || ""}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password-login"
                value={formState.password || ""}
                onChange={handleChange}
                required
              />
              <input type="submit" onClick={handleFormSubmit} />
              <p>
                <span>
                  Enter password only if you would like it to be updated.
                </span>
              </p>
            </form>
          ) : (
            <p className="login-please">
              You need to be logged in to edit this Step. Please{" "}
              <span>
                &nbsp;
                <Link to="/login">login</Link> or&nbsp;
                <Link to="/signup">signup.</Link>
              </span>
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default Account;
