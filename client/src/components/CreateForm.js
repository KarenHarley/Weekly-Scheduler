import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { CREATE_TASK } from "../utils/mutations";
import { times, createOptions } from "../utils/times";
import { QUERY_TASKS } from "../utils/queries";

const CreateForm = ({ data }) => {
  const [formState, setFormState] = useState({
    name: "",
    notes: "",
    startingTime: "",
    endingTime: "",
    day: "",
  });

  const [createTask, { error }] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      //cache gives us access to our cache
      try {
        // First we retrieve existing profile data that is stored in the cache under the `QUERY_PROFILES` query
        // Could potentially not exist yet, so wrap in a try/catch
        const { tasks } = cache.readQuery({ query: QUERY_TASKS }); //this is accessing our local cache
        // profiles is an array of obj

        // Then we update the cache by combining existing profile data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_TASKS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { tasks: [...tasks, createTask] }, //first get existing profiles (...profiles) then give me the new profile (addProfile)
        });
      } catch (e) {
        console.error(e);
      }
    },
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
      const { taskData } = await createTask({
        variables: { ...formState },
      });
      console.log(taskData);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      name: "",
      notes: "",
      startingTime: "",
      endingTime: "",
      day: "",
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
