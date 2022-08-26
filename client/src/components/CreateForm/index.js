import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { selectHttpOptionsAndBody, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { CREATE_TASK, CREATE_STEP } from "../../utils/mutations";
import {
  times,
  createOptions,
  days,
  quadrants,
  createQuadrantOptions,
} from "../../utils/utils";
import {
  QUERY_TASKS,
  QUERY_TASK,
  QUERY_DUPLICATE_TASK,
  QUERY_DUPLICATE_STEP,
} from "../../utils/queries";

/*
IMPORTANT!!!!!!!!! FIX SALT ISSUE!!!!!!!
*/
const CreateForm = ({ setDay, day }) => {
  const location = useLocation();
  const params = useParams();
  const [formState, setFormState] = useState({
    name: "",
    notes: "",
    startingTime: "",
    endingTime: "",
    day: "",
    quadrant: "",
  });
  //to only use one mutation
  let QUERY;
  if (location.pathname == "/tasks") {
    QUERY = QUERY_DUPLICATE_TASK;
  } else {
    QUERY = QUERY_DUPLICATE_STEP;
  }

  const { loading, data, refetch } = useQuery(QUERY, {
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

  const [createStep, { errorStep }] = useMutation(CREATE_STEP, {
    refetchQueries: [
      {
        query: QUERY_TASK,
        variables: { taskId: params.id },
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
  const createTaskInDB = async () => {
    if (
      formState.name === "" ||
      formState.day === "" ||
      formState.startingTime === "" ||
      formState.endingTime === ""
    ) {
      alert("Task Day, Name, StartingTime, and EndingTime are required.");
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
          quadrant: "",
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("This time already has a task");
    }
  };
  const createStepInDB = async () => {
    console.log("HI");
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
    if (!data.duplicateStep) {
      try {
        const stepData = await createStep({
          variables: {
            name: formState.name,
            notes: formState.notes,
            task: params.id,
            startingTime: formState.startingTime,
            endingTime: formState.endingTime,
            quadrant: formState.quadrant,
          },
        });
        // clear form values
        setFormState({
          name: "",
          notes: "",
          startingTime: "",
          endingTime: "",
          day: "",
          quadrant: "",
        });
      } catch (e) {
        console.error(e);
      }
      console.log("No duplicate");
    } else {
      alert("This time already has a task");
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // location.pathname == "/tasks" ? createTaskInDB() : createStepInDB;
    if (location.pathname == "/tasks") {
      createTaskInDB();
    }
    createStepInDB();
  };
  useEffect(() => {
    console.log("Use effect");
    refetch();
  }, [formState]);
  return (
    <div className="create-task-wrapper">
      <form className="create-form">
        <div className="create-task-heading">
          {location.pathname == "/tasks" ? (
            <h4>Create Task</h4>
          ) : (
            <h4>Create Step</h4>
          )}
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="task-name"
          value={formState.name}
          onChange={handleChange}
          required
        />
        <textarea
          type="text"
          name="notes"
          placeholder="Notes (optional)"
          id="task-notes"
          value={formState.notes}
          onChange={handleChange}
          required
        />
        {location.pathname == "/tasks" ? (
          <select
            required
            id="day"
            name="day"
            value={formState.day}
            onChange={handleChange}
            // defaultValue={"default"}
          >
            <option value={"default"}>Select Day</option>
            {days.map((day) => {
              return (
                <option value={day} key={day}>
                  {day}
                </option>
              );
            })}
          </select>
        ) : (
          <></>
        )}
        <select
          id="start"
          name="startingTime"
          value={formState.startingTime}
          onChange={handleChange}
          // defaultValue={"default"}
        >
          <option value={"default"}>Select Starting Time</option>
          {times.map((time) => {
            return createOptions(time);
          })}
        </select>
        <select
          id="end"
          name="endingTime"
          value={formState.endingTime}
          onChange={handleChange}
          // defaultValue={"default"}
        >
          <option value={"default"}>Select Ending Time</option>
          {times.map((time) => {
            return createOptions(time);
          })}
        </select>
        <select
          id="quadrant"
          name="quadrant"
          value={formState.quadrant}
          onChange={handleChange}
          // defaultValue={"default"}
        >
          <option value={"default"}>Select Quadrant (optional)</option>
          {quadrants.map((quadrant) => {
            return createQuadrantOptions(quadrant);
          })}
        </select>
        <input type="submit" onClick={handleFormSubmit} />
      </form>
      {error && <div className="error">Something went wrong...</div>}
    </div>
  );
};

export default CreateForm;
