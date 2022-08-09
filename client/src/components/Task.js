import { Link } from "react-router-dom";
import { formatTime } from "../utils/utils";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { CHANGE_COMPLETED } from "../utils/mutations";
const Task = ({ data }) => {
  const [changeCompleted, { error, changeCompletedData }] =
    useMutation(CHANGE_COMPLETED);

  const ChangeCompleted = async (taskId, checked) => {
    try {
      const { updateCompleted } = await changeCompleted({
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
        {data.quadrant ? <span>{data.quadrant}</span> : <span>Task</span>}
        <span>
          {formatTime(data.startingTime)}-{formatTime(data.endingTime)}
        </span>{" "}
        <span> Name: {data.name}</span>
        <span>
          <Link to={`task/${data._id}`}>See More</Link>
        </span>
      </p>
    </div>
  );
};

export default Task;
