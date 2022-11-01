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
    <div className="edit-task-container step-edit-container ">
      {Auth.loggedIn() ? (
        <div className="edit-task-wrapper step-edit-wrapper create-task-wrapper">
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
              <form className="create-form" onSubmit={handleFormSubmit}>
                <h1>Edit Step</h1>
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
                {error && <div className="error">Something went wrong...</div>}
                <Link to={`/step/${data.step._id}`}>Back to Step</Link>
              </form>
            </>
          )}
        </div>
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
    </div>
  );
};

export default EditStep;
