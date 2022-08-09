import { Link } from "react-router-dom";
import { formatTime } from "../utils/utils";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { CHANGE_COMPLETED } from "../utils/mutations";
const Task = ({ data }) => {
  console.log(data);
  const [changeCompleted, { error, changeCompletedData }] =
    useMutation(CHANGE_COMPLETED);

  const ChangeCompleted = async (taskId, checked) => {
    try {
      console.log(checked);
      const { updateCompleted } = await changeCompleted({
        variables: { completed: checked, _id: taskId },
      });
      console.log(updateCompleted);
      console.log(checked);
      return checked;
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = async (e) => {
    console.log("checked", e.target.checked);
    const change = await ChangeCompleted(e.target.id, e.target.checked);
    e.target.checked = change;
  };

  // useEffect(() => {
  //   if (data) {
  //     setChecked(data.completed);
  //   }
  // }, [data]);
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
        {/* {data.completed ? <span>{data.quadrant}</span> : <></>} */}
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
