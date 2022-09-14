import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../utils/queries";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import CreateForm from "../components/CreateForm";
import { days } from "../utils/utils";
const Tasks = () => {
  const [day, setDay] = useState("Monday");
  const [showForm, setShowForm] = useState(false);

  const { loading, data } = useQuery(QUERY_TASKS, {
    variables: {
      selectedDay: day,
    },
  });

  const tasks = data?.tasks || [];
  const selectDay = (e) => {
    if (e.target.type === "li") {
      console.log(e.target.id);
      setDay(e.target.id);
    }
  };
  const changeShowForm = () => {
    setShowForm((prev) => !prev);
  };
  const deleteAllTasks = () => {
    
  }
  return (
    <div className="tasks-wrapper">
      <div className="select-day-div">
        <ul onClick={selectDay}>
          <li className="nav-link pre-new-section ">
            <button
               onClick={deleteAllTasks}
              id="delete"
              style={{ textDecoration: "none" }}
              className="nav-button"
            >
              Delete All
            </button>
          </li>
          {days.map((loopingDay, i) => {
            return (
              <li
                type="li"
                id={loopingDay}
                key={loopingDay}
                className={day === loopingDay ? "selected-day" : "nav-link"}
              >
                {loopingDay}
              </li>
            );
          })}
          {/* <span>||</span> */}
          <li className="nav-link new-section">
            <button
              onClick={changeShowForm}
              id="create"
              style={{ textDecoration: "none" }}
              className="nav-button"
            >
              {!showForm ? "Create Task" : "Hide Create Form"}
            </button>
          </li>
        </ul>
      </div>
      {Auth.loggedIn() ? (
        <div className="all-tasks-wrapper">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {tasks.length >= 1 ? (
                <div className="all-tasks">
                  {tasks.map((task, i) => {
                    return <Task data={task} key={i} day={day} />;
                  })}
                </div>
              ) : (
                <p className="no-tasks">No Tasks</p>
              )}
            </>
          )}
          {showForm ? (
            <div className="create-form-div">
              <CreateForm setDay={setDay} day={day} />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="login-please">
          <span>
            You need to be logged in to see your Tasks. Please&nbsp;
            <Link to="/login">login</Link> or&nbsp;
            <Link to="/signup">signup.</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default Tasks;
