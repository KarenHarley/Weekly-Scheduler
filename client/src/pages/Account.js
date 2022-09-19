import React, { useState, useEffect } from "react";
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

  const [update, { error, updateData }] = useMutation(UPDATE_USER, {
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
      const { data } = await update({
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
        <img src={"./Pics/loading-gif.gif"} alt="loading..." />
      ) : (
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
            <span>Enter password only if you would like it to be updated.</span>
          </p>
        </form>
      )}
    </div>
  );
};
export default Account;
