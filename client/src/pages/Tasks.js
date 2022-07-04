import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../utils/queries";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import Auth from "../utils/auth";
import { useState, useEffect } from "react";

const Tasks = () => {
  const [id, setId] = useState();

  const { loading, data } = useQuery(QUERY_TASKS, {
    variables: {
      userId: id,
    },
  });

  console.log(data);
  const tasks = data?.tasks || [];

  useEffect(() => {
    if (Auth.loggedIn()) {
      setId(Auth.getProfile().data._id);
    }
  }, []);
  return (
    <div className="tasks-wrapper">
      <h1>Welcome to the Tasks Page</h1>
      {Auth.loggedIn() ? (
        <div className="all-tasks-wrapper">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {tasks.map((task, i) => {
                return <Task data={task} key={i} />;
              })}
            </div>
          )}
        </div>
      ) : (
        <p>
          You need to be logged in to see your Tasks. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default Tasks;
