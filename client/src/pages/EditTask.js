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
  console.log(data);
  const [taskName, setTaskName] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [taskStart, setTaskStart] = useState("");
  const [taskEnd, setTaskEnd] = useState("");

  const times = [
    "1:00 am",
    "1:30 am",
    "2:00 am",
    "2:30 am",
    "3:00 am",
    "3:30 am",
    "4:00 am",
    "4:30 am",
    "5:00 am",
    "5:30 am",
    "6:00 am",
    "6:30 am",
    "7:00 am",
    "7:30 am",
    "8:00 am",
    "8:30 am",
    "9:00 am",
    "9:30 am",
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 am",
    "12:30 am",
    "1:00 pm",
    "1:30 pm",
    "2:00 pm",
    "2:30 pm",
    "3:00 pm",
    "3:30 pm",
    "4:00 pm",
    "4:30 pm",
    "5:00 pm",
    "5:30 pm",
    "6:00 pm",
    "6:30 pm",
    "7:00 pm",
    "7:30 pm",
    "8:00 pm",
    "8:30 pm",
    "9:00 pm",
    "9:30 pm",
    "10:00 pm",
    "10:30 pm",
    "11:00 pm",
    "11:30 pm",
    "12:00 pm",
  ];

  const onChange = (e) => {
    console.log(e.target);
    switch (e.target.id) {
      case "start":
        setTaskStart(e.target.value);
        break;
      case "end":
        setTaskEnd(e.target.value);
        break;
      case "name":
        setTaskName(e.target.value);
        break;
      default:
        setTaskNotes(e.target.value);
    }
  };

  const createOptions = (time) => {
    //set value to 1 in "1:00 am"
    let optionValue = time.split(":")[0];
    let optionKey = time.split(":")[0];
    //if the string has "pm" set value to 13 in  "1 pm"
    if (time.split(" ")[1] === "pm") {
      optionValue = Number(time.split(":")[0]) + 12;
      optionKey = Number(time.split(":")[0]) + 12;
    }
    // if the string has "30" set the value and key to 1.5 in "1 am"
    if (
      time.split(" ")[0].split(":")[1] === "30" &&
      time.split(" ")[1] === "am"
    ) {
      optionValue = Number(time.split(":")[0]) + 0.5;
      optionKey = Number(time.split(":")[0]) + 0.5;
    } else if (
      // if the string has "30" set the value and key to 13.5 in "1 pm"
      time.split(" ")[0].split(":")[1] === "30" &&
      time.split(" ")[1] === "pm"
    ) {
      optionValue = Number(time.split(":")[0]) + 12.5;
      optionKey = Number(time.split(":")[0]) + 12.5;
    }
    return (
      <option value={optionValue} key={optionKey}>
        {time}
      </option>
    );
  };

  useEffect(() => {
    if (data) {
      setTaskName(data.task.name);
      setTaskNotes(data.task.notes);
      setTaskStart(data.task.startingTime);
      setTaskEnd(data.task.endingTime);
    }
  }, [data]);

  return (
    <div className="edit-task-wrapper">
      <div className="edit-task-heading">
        <h1>Edit task</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <form>
              <label>
                Select Starting Time
                <select id="start" value={taskStart} onChange={onChange}>
                  {times.map((time) => {
                    return createOptions(time);
                  })}
                </select>
              </label>
              <label>
                Select Ending Time
                <select id="end" value={taskEnd} onChange={onChange}>
                  {times.map((time) => {
                    return createOptions(time);
                  })}
                </select>
              </label>
              <label>
                Name:
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={taskName}
                  onChange={onChange}
                />
              </label>
              <label>
                Notes:
                <input
                  id="notes"
                  type="text"
                  name="notes"
                  value={taskNotes}
                  onChange={onChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <Link to={`/task/${data.task._id}`}>Back to Task</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTask;
