import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TASK, QUERY_STEPS } from "../utils/queries";
import { REMOVE_TASK } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/utils";
import CreateForm from "../components/CreateForm";
import Auth from "../utils/auth";
import Task from "../components/Task";

const OneTask = () => {
  const params = useParams();
  console.log(params.id);
  const [addSteps, setaddSteps] = useState(false);
  const [deleteTask, { errorTask }] = useMutation(REMOVE_TASK, {
    refetchQueries: [
      {
        query: QUERY_TASK,
        variables: { taskId: params.id },
      },
    ],
  });

  const { loading, data } = useQuery(QUERY_TASK, {
    variables: {
      taskId: params.id,
    },
  });

  const changeAddStep = () => {
    setaddSteps((prev) => !prev);
  };

  const deleteOneTask = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        const taskData = await deleteOneTask({
          variables: {
            taskId: params.id,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
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
              <div className="one-task-and-create-form">
                <div
                  className={
                    data.task.quadrant
                      ? `${data.task.quadrant} one-task`
                      : "one-task"
                  }
                >
                  <p>
                    {data.task.quadrant ? (
                      <span>{data.task.quadrant}</span>
                    ) : (
                      <></>
                    )}
                    {formatTime(data.task.startingTime)}-
                    {formatTime(data.task.endingTime)}
                  </p>
                  <p className="name-heading">{data.task.name}</p>
                  <button id="button-show-form" onClick={deleteOneTask}>
                    DELETE
                  </button>
                  {data.task.notes ? (
                    <div className="notes-div">
                      <h4>Notes:</h4>
                      <p>{data.task.notes}</p>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="edit-or-show-form-div">
                    <button id="button-show-form" onClick={changeAddStep}>
                      {!addSteps ? "Add Mini-Tasks" : "Hide Create Form"}
                    </button>
                    <Link to={`/task/edit/${data.task._id}`}>Edit</Link>
                  </div>
                </div>
                {addSteps ? (
                  <div className="create-step-form one-task-form">
                    <CreateForm
                      taskStartingTime={data.task.startingTime}
                      taskEndingTime={data.task.endingTime}
                    />
                  </div>
                ) : (
                  <></>
                )}
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
