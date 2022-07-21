import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TASK } from "../utils/queries";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/utils";
import Auth from "../utils/auth";

const OneTask = () => {
  const params = useParams();
  console.log(params.id);

  const { loading, data } = useQuery(QUERY_TASK, {
    variables: {
      taskId: params.id,
    },
  });
  console.log(data);
  return (
    <div className="task-wrapper">
      {Auth.loggedIn() ? (
        <div className="task-heading">
          <h1>One task</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <p>
                {formatTime(data.task.startingTime)}-
                {formatTime(data.task.endingTime)}
              </p>
              <p>Name: {data.task.name}</p>
              <p>Notes: {data.task.notes}</p>
              <Link to={`/task/edit/${data.task._id}`}>Edit</Link>
            </div>
          )}
        </div>
      ) : (
        <p className="login-please">
          You need to be logged in to see this Task. Please{" "}
          <span>
            &nbsp;
            <Link to="/login"> login</Link> or &nbsp;
            <Link to="/signup">signup.</Link>
          </span>
        </p>
      )}
    </div>
  );
};

export default OneTask;
