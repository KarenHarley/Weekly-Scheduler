import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TASK, QUERY_STEPS } from "../utils/queries";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/utils";
import Auth from "../utils/auth";
import Step from "../components/Step";

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
    <div className="one-task-wrapper">
      {Auth.loggedIn() ? (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="one-task">
                <p>
                  {data.task.quadrant ? (
                    <span>{data.task.quadrant}</span>
                  ) : (
                    <></>
                  )}
                  {formatTime(data.task.startingTime)}-
                  {formatTime(data.task.endingTime)}
                </p>
                <p>Name: {data.task.name}</p>
                <div className="notes-div">
                  <h4>Notes:</h4>
                  <p>{data.task.notes}</p>
                </div>
                <Link to={`/task/edit/${data.task._id}`}>Edit</Link>
              </div>
              <div className="step-container">
                {data.task.steps.map((loopingStep, i) => {
                  return (
                    // <li type="li" id={loopingStep.id} key={loopingStep.id}>
                    <Step data={loopingStep} key={i} />
                    // </li>
                  );
                })}
              </div>
            </>
          )}
        </div>
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
