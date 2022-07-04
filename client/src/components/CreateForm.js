import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { CREATE_TASK } from "../utils/mutations";

const CreateForm = ({ data }) => {
  const [formState, setFormState] = useState({
    name: "",
    notes: "",
    startingTime: "",
    endingTime: "",
    user: "",
  });

  const [createTask, { error, taskData }] = useMutation(CREATE_TASK);

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
      const { taskData } = await createTask({
        variables: { ...formState, _id: data.id },
      });

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
    <div className="create-task-wrapper">
      <div className="create-task-heading">
        <h1>Welcome to the Create Tasks Page</h1>
      </div>

      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="task-name"
          value={formState.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          id="task-notes"
          value={formState.notes}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="startingTime"
          placeholder="Start"
          id="task-startingTime"
          value={formState.startingTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endingTime"
          placeholder="End"
          id="task-endingTime"
          value={formState.endingTime}
          onChange={handleChange}
          required
        />
        <input type="submit" onClick={handleFormSubmit} />
      </form>
    </div>
  );
};

export default CreateForm;
