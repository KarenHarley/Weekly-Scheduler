import { Link } from "react-router-dom";

const Task = ({ data }) => {
  console.log(data);
  return (
    <div className="task-wrapper">
      <div className="task-heading">
        <p>This is a single task</p>
        <p>
          {data.startingTime}-{data.endingTime}
        </p>
        <p>Name: {data.name}</p>
        <Link to={`task/${data._id}`}>See More</Link>
      </div>
    </div>
  );
};

export default Task;
