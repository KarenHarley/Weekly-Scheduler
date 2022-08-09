import { Link } from "react-router-dom";
import { formatTime } from "../utils/utils";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { CHANGE_COMPLETED } from "../utils/mutations";
const Task = ({ data }) => {
  console.log(data);
  const [checked, setChecked] = useState(false);
  const [changeCompleted, { error, changeCompletedData }] =
    useMutation(CHANGE_COMPLETED);
  console.log(checked);

  const ChangeCompleted = async (TaskId) => {
    console.log(TaskId);
    console.log(checked);
    try {
      const { updateCompleted } = await changeCompleted({
        variables: { completed: checked, _id: TaskId },
      });
      console.log(updateCompleted);
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (e) => {
    setChecked(!checked);
    ChangeCompleted(e.target.id);
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
            checked={checked}
            defaultChecked={data.completed}
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
