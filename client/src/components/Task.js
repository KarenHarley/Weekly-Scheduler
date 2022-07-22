import { Link } from "react-router-dom";
import { formatTime } from "../utils/utils";
const Task = ({ data }) => {
  console.log(data);
  return (
    <div className="task-wrapper">
      <p>
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
