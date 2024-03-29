import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STEP } from "../utils/queries";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/utils";
import Auth from "../utils/auth";

const OneStep = () => {
  const params = useParams();
  console.log(params.id);

  const { loading, data } = useQuery(QUERY_STEP, {
    variables: {
      stepId: params.id,
    },
  });

  console.log(data);

  return (
    <div className="one-task-wrapper">
      {Auth.loggedIn() ? (
        <div className="steps-and-task-container">
          {loading ? (
            <div className="loading-div">
              <img
                className="loading"
                src={"../Pics/loading-gif.gif"}
                alt="loading..."
              />
            </div>
          ) : (
            <>
              <div
                className={
                  data.step.quadrant
                    ? `${data.step.quadrant} one-task`
                    : "one-task"
                }
              >
                <p>
                  {data.step.quadrant ? (
                    <span>{data.step.quadrant}</span>
                  ) : (
                    <></>
                  )}
                  {formatTime(data.step.startingTime)}-
                  {formatTime(data.step.endingTime)}
                </p>
                <p>Name: {data.step.name}</p>
                <div className="notes-div">
                  <h4>Notes:</h4>
                  <p>{data.step.notes}</p>
                </div>
                <div className="edit-or-back">
                  <Link id="back-link" to={`/task/${data.step.task}`}>
                    Back
                  </Link>
                  <Link to={`/step/edit/${data.step._id}`}>Edit</Link>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="login-please">
          You need to be logged in to see this step. Please{" "}
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

export default OneStep;
