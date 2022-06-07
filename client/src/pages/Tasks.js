import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_TASKS } from '../utils/queries';

import Task from "../components/Task";
const Tasks = () => {

    let id = "629e57ed0abac12714b8d215";

    const { loading, data } = useQuery(QUERY_TASKS, {
        variables: {
            userId: id,
          },
      });
      console.log(data)
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
