import { Link, useLocation, useParams } from "react-router-dom";
import { formatTime } from "../../utils/utils";
import { useMutation } from "@apollo/client";
import {
  CHANGE_COMPLETED_TASK,
  CHANGE_COMPLETED_STEP,
  REMOVE_TASK,
  REMOVE_STEP,
} from "../../utils/mutations";
import { QUERY_TASKS, QUERY_TASK } from "../../utils/queries";
const Task = ({ data, day }) => {
  const params = useParams();
  console.log(params.id);
  const location = useLocation();
  // mutation to use checkbox for tasks
  const [changeCompletedTask] = useMutation(CHANGE_COMPLETED_TASK);
  //mutation to use checkbox for steps
  const [changeCompletedStep] = useMutation(CHANGE_COMPLETED_STEP);
  //mutation to delete a task and refetch
  const [deleteTask] = useMutation(REMOVE_TASK, {
    refetchQueries: [
      {
        query: QUERY_TASKS,
        variables: { selectedDay: day },
      },
    ],
  });
  //mutation to delete a step
  const [deleteStep] = useMutation(REMOVE_STEP, {
    refetchQueries: [
      {
        query: QUERY_TASK,
        variables: { taskId: params.id },
      },
    ],
  });
  //function to use mutation that changes checkbox value for task and step based on pathname
  const ChangeCompleted = async (taskId, checked) => {
    if (location.pathname === "/tasks") {
      try {
        await changeCompletedTask({
          variables: { completed: checked, _id: taskId },
        });
        return checked;
      } catch (e) {
        console.error(e);
      }
      return;
    }
    try {
      await changeCompletedStep({
        variables: { completed: checked, _id: taskId },
      });
      return checked;
    } catch (e) {
      console.error(e);
    }
  };
  //function to change checkbox value in state
  const handleChange = async (e) => {
    const change = await ChangeCompleted(e.target.id, e.target.checked);
    e.target.checked = change;
  };
  //function to delete one task
  const deleteOneTask = async (e) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this task?"
    );
    if (confirmBox === false) {
      return;
    }
    console.log(e.target.id);
    if (location.pathname === "tasks") {
      try {
        await deleteTask({
          variables: {
            taskId: e.target.id,
          },
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await deleteStep({
          variables: {
            stepId: e.target.id,
            taskId: params.id,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div
      className={
        data.quadrant ? `${data.quadrant} task-wrapper` : "task-wrapper"
      }
    >
      <p>
        {" "}
        <span>
          <input
            id={data._id}
            type="checkbox"
            checked={data.completed}
            onChange={handleChange}
          />
        </span>
        {data.quadrant ? (
          <span>{data.quadrant}</span>
        ) : (
          <span>
            <i className="bx bx-calendar-edit"></i>
          </span>
        )}
        <span>
          {formatTime(data.startingTime)}-{formatTime(data.endingTime)}
        </span>{" "}
        <span
          className={
            data.name.length > 10 ? `long-name task-name` : "task-name"
          }
        >
          {data.name}
        </span>
        <span>
          {location.pathname === "/tasks" ? (
            <Link to={`task/${data._id}`}>See More</Link>
          ) : (
            <Link to={`/step/${data._id}`}>See More</Link>
          )}
        </span>
        <span className="delete-task" id={data._id} onClick={deleteOneTask}>
          X
        </span>
      </p>
    </div>
  );
};

export default Task;
