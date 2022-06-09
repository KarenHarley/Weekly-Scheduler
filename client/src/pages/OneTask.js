import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TASK } from "../utils/queries";
import { useParams } from "react-router-dom";
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
      <div className="task-heading">
        <h1>One task</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <p>
              {data.task.startingTime}-{data.task.endingTime}
            </p>
            <p>Name: {data.task.name}</p>
            <p>Notes: {data.task.notes}</p>
            <Link to={`/task/edit/${data.task._id}`}>Edit</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneTask;
