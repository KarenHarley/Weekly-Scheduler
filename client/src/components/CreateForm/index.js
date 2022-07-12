import React, { useEffect, useState } from "react";
import { selectHttpOptionsAndBody, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { CREATE_TASK } from "../../utils/mutations";
import { times, createOptions, days } from "../../utils/times";
import { QUERY_TASKS, QUERY_DUPLICATE } from "../../utils/queries";

const CreateForm = ({ setDay, day }) => {
  const [formState, setFormState] = useState({
    name: "",
    notes: "",
    startingTime: "",
    endingTime: "",
    day: "",
  });
  const { loading, data, refetch } = useQuery(QUERY_DUPLICATE, {
    variables: {
      startingTime: formState.startingTime,
      endingTime: formState.endingTime,
      day: formState.day,
    },
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
    console.log(data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formState.startingTime == formState.endingTime) {
      alert("Same start and ending time");
      return;
    }
    if (formState.startingTime > formState.endingTime) {
      alert("Starting Time can not be later than the ending time");
      return;
    }
    if (!data.duplicate) {
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
    } else {
      alert("This time already has a task");
    }
  };
  useEffect(() => {
    console.log("Use effect");
    refetch();
  }, [formState]);
  return (
    <div className="create-task-wrapper">
      <div className="create-task-heading">
        <h4>Create Form</h4>
      </div>

      <form className="create-form">
        <div className="name-notes-div">
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
        </div>
        <select
          required
          id="day"
          name="day"
          value={formState.day}
          onChange={handleChange}
        >
          <option value="disabled" disabled={true} defaultValue>
            Select Day
          </option>
          {days.map((day) => {
            return (
              <option value={day} key={day}>
                {day}
              </option>
            );
          })}
        </select>
        <select
          id="start"
          name="startingTime"
          value={formState.startingTime}
          onChange={handleChange}
        >
          <option value="disabled" disabled={true} defaultValue>
            Select Starting Time
          </option>
          {times.map((time) => {
            return createOptions(time);
          })}
        </select>
        <select
          id="end"
          name="endingTime"
          value={formState.endingTime}
          onChange={handleChange}
        >
          <option value="disabled" disabled={true} defaultValue>
            Select Ending Time
          </option>
          {times.map((time) => {
            return createOptions(time);
          })}
        </select>
        <input type="submit" onClick={handleFormSubmit} />
      </form>
      {error && <div className="error">Something went wrong...</div>}
    </div>
  );
};

export default CreateForm;
