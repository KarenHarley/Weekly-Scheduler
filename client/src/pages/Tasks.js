import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../utils/queries";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import CreateForm from "../components/CreateForm";
import { days } from "../utils/times";
const Tasks = () => {
  const [id, setId] = useState(0);
  const [day, setDay] = useState("Monday");

  const { loading, data } = useQuery(QUERY_TASKS, {
    variables: {
      selectedDay: day,
    },
  });

  console.log(data);
  const tasks = data?.tasks || [];
  console.log(tasks);
  console.log(day);
  const selectDay = (e) => {
    if (e.target.type === "li") {
      console.log(e.target.id);
      setDay(e.target.id);
    }
  };
  useEffect(() => {
    if (Auth.loggedIn()) {
      setId(Auth.getProfile().data._id);
    }
  }, []);
  return (
    <div className="tasks-wrapper">
      <h1>Welcome to the Tasks Page</h1>

      <div className="select-day-div">
        <ul onClick={selectDay}>
          {days.map((loopingDay, i) => {
            return (
              <li
                type="li"
                id={loopingDay}
                key={loopingDay}
                className={day === loopingDay ? "selected" : "nav-link"}
              >
                {loopingDay}
              </li>
            );
          })}
        </ul>
      </div>
      {Auth.loggedIn() ? (
        <div className="all-tasks-wrapper">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {tasks.length >= 1 ? (
                <div>
                  {tasks.map((task, i) => {
                    return <Task data={task} key={i} />;
                  })}
                </div>
              ) : (
                <p>No Tasks</p>
              )}
            </div>
          )}
          <div className="create-form-div">
            <CreateForm setDay={setDay} day={day} />
          </div>
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
