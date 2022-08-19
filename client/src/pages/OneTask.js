import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TASK, QUERY_STEP } from "../utils/queries";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/utils";
import CreateForm from "../components/CreateForm";
import Auth from "../utils/auth";
import TaskCard from "../components/TaskCard";

const OneTask = () => {
  const params = useParams();
  const location = useLocation();
  //to only use one query
  console.log(location.pathname);
  console.log(location.pathname.indexOf("task"));
  let QUERY;
  if (location.pathname.indexOf("task") > 0) {
    QUERY = QUERY_TASK;
  } else {
    // if (location.pathname.indexOf("step") > 0)
    QUERY = QUERY_STEP;
  }

  const { loading, data } = useQuery(QUERY, {
    variables: {
      id: params.id,
    },
  });

  console.log(data);

  return (
    <div className="one-task-wrapper">
      {" "}
      {Auth.loggedIn() ? (
        <TaskCard />
      ) : (
        <p className="login-please">
          You need to be logged in to see this Task. Please{" "}
          <span>
            &nbsp;
            <Link to="/login">login</Link> or&nbsp;
            <Link to="/signup">signup.</Link>
          </span>
        </p>
      )}
    </div>
  );
};

export default OneTask;
