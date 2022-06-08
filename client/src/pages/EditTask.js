import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TASK } from "../utils/queries";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const EditTask = () => {
  const params = useParams();
 

  const { loading, data } = useQuery(QUERY_TASK, {
    variables: {
      taskId: params.id,
    },
  });

  const [taskName, setTaskName] = useState(data.task.name);
  console.log(data);
  return (
    <div className="edit-task-wrapper">
      <div className="edit-task-heading">
        <h1>Edit task</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <p>
              {data.task.startingTime}-{data.task.endingTime}
            </p>
            <p>Name: {data.task.name}</p>
            <p>Notes: {data.task.notes}</p>
            <Link to={`/task/${data.task._id}`}>Back to Task</Link>

            <form>
              <label>
                Name:
                <input type="text" name="name" value={taskName}/>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTask;
