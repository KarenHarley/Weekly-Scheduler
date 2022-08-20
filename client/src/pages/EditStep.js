import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_STEP } from "../utils/queries";
import { UPDATE_STEP } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  times,
  createOptions,
  createQuadrantOptions,
  quadrants,
} from "../utils/utils";

import Auth from "../utils/auth";

const EditStep = () => {
  const params = useParams();

  const { loading, data } = useQuery(QUERY_STEP, {
    variables: {
      stepId: params.id,
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

  const [updateStep, { error, updateData }] = useMutation(UPDATE_STEP);

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
    console.log(formState);

    try {
      const { updateData } = await updateStep({
        variables: { ...formState, _id: data.step._id },
      });
      console.log(updateData);
      window.location.replace(`/step/${data.step._id}`);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (data) {
      setFormState({
        name: data.step.name,
        notes: data.step.notes,
        startingTime: data.step.startingTime,
        endingTime: data.step.endingTime,
        quadrant: data.step.quadrant,
      });
    }
  }, [data, updateData]);

  return (
    <div className="edit-task-container step-edit-container">
      <h1>Edit Step</h1>
      {Auth.loggedIn() ? (
        <div className="edit-task-wrapper step-edit-wrapper">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <form onSubmit={handleFormSubmit}>
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
                <input type="submit" value="Submit" />
              </form>
              <Link to={`/task/${data.task._id}`}>Back to Task</Link>
            </div>
          )}
        </div>
      ) : (
        <p>
          You need to be logged in to see this Task. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default EditStep;
