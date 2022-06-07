import { Link } from "react-router-dom";

const Task = ({ data }) => {
  console.log(data);
  return (
    <div className="task-wrapper">
      <div className="task-heading">
        <p>This is a single task</p>
        <p>Name: {data.name}</p>
        <p>Starting Time: {data.startingTime}</p>
        <p>Ends: {data.endingTime}</p>
        <p>User: {data.user.username}</p>
      </div>
    </div>
  );
};

export default Task;
