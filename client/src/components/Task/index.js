import { Link, useLocation } from "react-router-dom";
import { formatTime } from "../../utils/utils";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  CHANGE_COMPLETED_TASK,
  CHANGE_COMPLETED_STEP,
} from "../../utils/mutations";
const Task = ({ data }) => {
  const location = useLocation();
  const [changeCompletedTask, { error, changeCompletedData }] = useMutation(
    CHANGE_COMPLETED_TASK
  );
  const [changeCompletedStep, { errorStep, changeCompletedStepData }] =
    useMutation(CHANGE_COMPLETED_STEP);

  const ChangeCompleted = async (taskId, checked) => {
    if (location.pathname == "/tasks") {
      try {
        const { updateCompleted } = await changeCompletedTask({
          variables: { completed: checked, _id: taskId },
        });
        return checked;
      } catch (e) {
        console.error(e);
      }
      return;
    }
    try {
      const { updateCompleted } = await changeCompletedStep({
        variables: { completed: checked, _id: taskId },
      });
      return checked;
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = async (e) => {
    const change = await ChangeCompleted(e.target.id, e.target.checked);
    e.target.checked = change;
  };

  return (
    <div
      className={
        data.quadrant ? `${data.quadrant} task-wrapper` : "task-wrapper"
      }
    >
      <p>
        {" "}
        <span>
          <input
            id={data._id}
            type="checkbox"
            checked={data.completed}
            onChange={handleChange}
          />
        </span>
        {data.quadrant ? (
          <span>{data.quadrant}</span>
        ) : (
          <span>
            <i class="bx bx-calendar-edit"></i>
          </span>
        )}
        <span>
          {formatTime(data.startingTime)}-{formatTime(data.endingTime)}
        </span>{" "}
        <span
          className={
            data.name.length > 10 ? `long-name task-name` : "task-name"
          }
        >
          {data.name}
        </span>
        <span>
          {location.pathname == "/tasks" ? (
            <Link to={`task/${data._id}`}>See More</Link>
          ) : (
            <Link to={`/step/${data._id}`}>See More</Link>
          )}
        </span>
      </p>
    </div>
  );
};

export default Task;
