import { Link } from "react-router-dom";
import { formatTime } from "../utils/utils";
import { useState, useEffect } from "react";
const Task = ({ data }) => {
  console.log(data);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <div
      className={
        data.quadrant ? `${data.quadrant} task-wrapper` : "task-wrapper"
      }
    >
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <p>
        {data.completed ? <span>{data.quadrant}</span> : <></>}
        {data.quadrant ? <span>{data.quadrant}</span> : <></>}
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
