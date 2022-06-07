import { Link } from "react-router-dom";
import Task from "../components/Task";
const Tasks = () => {
  return (
    <div className="tasks-wrapper">
      <div className="task-heading">
        <h1>Welcome to the Tasks Page</h1>
        <Task />
      </div>
    </div>
  );
};

export default Tasks;
