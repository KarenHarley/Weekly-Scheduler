
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../utils/queries";
import { useParams,Link } from "react-router-dom";
import Task from "../components/Task";
const Tasks = () => {
  const params = useParams();
  //let id = "629e57ed0abac12714b8d215";
  // local storage???
  const { loading, data } = useQuery(QUERY_TASKS, {
    variables: {
      userId: params.id,
    },
  });

  console.log(data);

  const tasks = data?.tasks || [];

  return (
    <div className="tasks-wrapper">
      <div className="task-heading">
        <h1>Welcome to the Tasks Page</h1>
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
    </div>
  );
};

export default Tasks;
