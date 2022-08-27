import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TASK, QUERY_STEPS } from "../utils/queries";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/utils";
import CreateForm from "../components/CreateForm";
import Auth from "../utils/auth";
import Task from "../components/Task";

const OneTask = () => {
  const params = useParams();
  console.log(params.id);
  const [addSteps, setaddSteps] = useState(false);

  const { loading, data } = useQuery(QUERY_TASK, {
    variables: {
      taskId: params.id,
    },
  });
  const changeAddStep = () => {
    setaddSteps((prev) => !prev);
  };
  console.log(data);

  return (
    <div className="one-task-wrapper">
      {Auth.loggedIn() ? (
        <div className="steps-and-task-container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {data.task.steps != 0 || addSteps ? (
                <div className="create-step-form">
                  <CreateForm />
                </div>
              ) : (
                <></>
              )}
              <div className="one-task">
                <p>
                  {data.task.quadrant ? (
                    <span>{data.task.quadrant}</span>
                  ) : (
                    <></>
                  )}
                  {formatTime(data.task.startingTime)}-
                  {formatTime(data.task.endingTime)}
                </p>
                <p>Name: {data.task.name}</p>
                <div className="notes-div">
                  <h4>Notes:</h4>
                  <p>{data.task.notes}</p>
                </div>
                <Link to={`/task/edit/${data.task._id}`}>Edit</Link>
              </div>
              {data.task.steps != 0 ? (
                <div className="step-container">
                  <h4>Steps or Smaller tasks to Accomplish this larger task</h4>
                  {data.task.steps.map((loopingStep, i) => {
                    return (
                      // <li type="li" id={loopingStep.id} key={loopingStep.id}>
                      <Task data={loopingStep} key={i} />
                      // </li>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              {data.task.steps <= 0 ? (
                <button onClick={changeAddStep}>Add Steps</button>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      ) : (
        <p className="login-please">
          You need to be logged in to see this Task. Please{" "}
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

export default OneTask;
