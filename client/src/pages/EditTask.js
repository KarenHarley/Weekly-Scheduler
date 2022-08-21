import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TASK } from "../utils/queries";
import { UPDATE_TASK } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  times,
  createOptions,
  createQuadrantOptions,
  quadrants,
} from "../utils/utils";

import Auth from "../utils/auth";

const EditTask = () => {
  const params = useParams();

  const { loading, data } = useQuery(QUERY_TASK, {
    variables: {
      taskId: params.id,
    },
  });
  console.log(data);

  const [formState, setFormState] = useState({
    name: "",
    notes: "",
    startingTime: "",
    endingTime: "",
    quadrant: "",
  });

  const [updateTask, { error, updateData }] = useMutation(UPDATE_TASK);

  const onChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      formState.name === "" ||
      formState.startingTime === "" ||
      formState.endingTime === ""
    ) {
      alert("Task Name, StartingTime, and EndingTime are required.");
      return;
    }
    if (formState.startingTime === formState.endingTime) {
      alert("Same start and ending time");
      return;
    }
    if (formState.startingTime > formState.endingTime) {
      alert("Starting Time can not be later than the ending time");
      return;
    }
    console.log(formState);

    try {
      const { updateData } = await updateTask({
        variables: { ...formState, _id: data.task._id },
      });
      console.log(updateData);
      window.location.replace(`/task/${data.task._id}`);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (data) {
      setFormState({
        name: data.task.name,
        notes: data.task.notes,
        startingTime: data.task.startingTime,
        endingTime: data.task.endingTime,
        quadrant: data.task.quadrant,
      });
    }
  }, [data, updateData]);

  return (
    <div className="edit-task-container">
      {Auth.loggedIn() ? (
        <div className="edit-task-wrapper">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <form onSubmit={handleFormSubmit}>
                <h1>Edit task</h1>
                <label>
                  Select Starting Time
                  <select
                    id="start"
                    name="startingTime"
                    value={formState.startingTime || ""}
                    onChange={onChange}
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
                    value={formState.endingTime || ""}
                    onChange={onChange}
                  >
                    {times.map((time) => {
                      return createOptions(time);
                    })}
                  </select>
                </label>
                <label>
                  Name:
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name || ""}
                    onChange={onChange}
                  />
                </label>

                <label>
                  Notes:
                  <textarea
                    type="text"
                    name="notes"
                    id="notes"
                    value={formState.notes || ""}
                    onChange={onChange}
                    required
                  />
                </label>
                <label>
                  <select
                    id="quadrant"
                    name="quadrant"
                    value={formState.quadrant || ""}
                    onChange={onChange}
                  >
                    {!formState.quadrant ? (
                      <option value={"default"}>Select Quadrant</option>
                    ) : (
                      <option value={""}>Remove Quadrant</option>
                    )}
                    {quadrants.map((quadrant) => {
                      return createQuadrantOptions(quadrant);
                    })}
                  </select>
                </label>
                <input type="submit" value="Submit" />
                <Link to={`/task/${data.task._id}`}>Back to Task</Link>
              </form>
            </>
          )}
        </div>
      ) : (
        <p className="login-please">
          You need to be logged in to edit this task. Please{" "}
          <span>
            &nbsp;
            <Link to="/login">login</Link> or&nbsp;
            <Link to="/signup">signup.</Link>
          </span>
        </p>
      )}
    </div>
  );
};

export default EditTask;
