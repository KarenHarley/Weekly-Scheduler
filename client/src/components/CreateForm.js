import React, { useState } from "react";
import { selectHttpOptionsAndBody, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { CREATE_TASK } from "../utils/mutations";
import { times, createOptions } from "../utils/times";
import { QUERY_TASKS } from "../utils/queries";

const CreateForm = ({ setDay, day }) => {
  const [formState, setFormState] = useState({
    name: "",
    notes: "",
    startingTime: "",
    endingTime: "",
    day: "",
  });

  const [createTask, { error }] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: QUERY_TASKS,
        variables: { selectedDay: day },
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
      const taskData = await createTask({
        variables: { ...formState },
      });
      setDay(formState.day);
      // clear form values
      setFormState({
        name: "",
        notes: "",
        startingTime: "",
        endingTime: "",
        day: "",
      });
    } catch (e) {
      console.error(e);
    }
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
          name="day"
          placeholder="Day of the Week"
          id="task-day"
          value={formState.day}
          onChange={handleChange}
          required
        />
        <label>
          Select Starting Time
          <select
            id="start"
            name="startingTime"
            value={formState.startingTime}
            onChange={handleChange}
          >
            {times.map((time) => {
              return createOptions(time);
            })}
          </select>
        </label>
        <label>
          Select Ending Time
          <select
            id="end"
            name="endingTime"
            value={formState.endingTime}
            onChange={handleChange}
          >
            {times.map((time) => {
              return createOptions(time);
            })}
          </select>
        </label>
        <input type="submit" onClick={handleFormSubmit} />
      </form>
      {error && <div className="error">Something went wrong...</div>}
    </div>
  );
};

export default CreateForm;
