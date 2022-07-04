
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../utils/queries";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import Auth from '../utils/auth';
const Tasks = () => {
//  const params = useParams();
  //let id = "629e57ed0abac12714b8d215";
  // local storage???

  const id = Auth.getProfile().data._id;
  const { loading, data } = useQuery(QUERY_TASKS, {
    variables: {
      userId: id,
    },
  });

  console.log(data);

  const tasks = data?.tasks || [];

  return (
    <div className="tasks-wrapper">
      
          {Auth.loggedIn() ? (
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
        ) : (
          <p>
            You need to be logged in to see you Tasks. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
    </div>
  );
};

export default Tasks;
