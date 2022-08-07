import { Link } from "react-router-dom";
import { formatTime } from "../utils/utils";
import { useState, useEffect } from "react";
import { CHANGE_COMPLETED } from "../utils/mutations";
const Task = ({ data }) => {
  console.log(data);
  const [checked, setChecked] = useState(false);
  console.log(checked);
  const handleChange = async (e) => {
    console.log("change", e.target.id);
    setChecked(!checked);
  };
  useEffect(() => {
    if (data) {
      setChecked(data.completed);
    }
  }, [data]);
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
            onChange={handleChange}
          />
        </span>
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
