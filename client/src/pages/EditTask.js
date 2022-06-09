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
  const [taskNotes, setTaskNotes] = useState(data.task.notes);
  const [taskStart, setTaskStart] = useState(data.task.startingTime);
  const [taskEnd, setTaskEnd] = useState(data.task.endingTime);
  console.log(data);

  const times = [
    "1:00 am",
    "2:00 am",
    "3:00 am",
    "4:00 am",
    "5:00 am",
    "6:00 am",
    "7:00 am",
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 am",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm",
    "7:00 pm",
    "8:00 pm",
    "9:00 pm",
    "10:00 pm",
    "11:00 pm",
    "12:00 pm",
  ];

  const timeChange = (e) => {
    if (e.target.id === "start") {
      setTaskStart(e.target.value);
    }
    setTaskEnd(e.target.value);
  };
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
                Select Starting Time
                <select id="start" value={taskStart} onChange={timeChange}>
                  {times.map((time) => {
                    //set value to 1 in "1:00 am"
                    let optionValue = time.split(":")[0];
                    let optionKey = time.split(":")[0];
                    //if the string has "pm" set value to 13 in  "1 pm"
                    if (time.split(" ")[1] === "pm") {
                      optionValue = Number(time.split(":")[0]) + 12;
                      optionKey = Number(time.split(":")[0]) + 12;
                    }

                    return (
                      <option value={optionValue} key={optionKey}>
                        {time}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                Select Ending Time
                <select id="end" value={taskEnd} onChange={timeChange}>
                  {times.map((time) => {
                    //set value to 1 in "1:00 am"
                    let optionValue = time.split(":")[0];
                    let optionKey = time.split(":")[0];
                    //if the string has "pm" set value to 13 in  "1 pm"
                    if (time.split(" ")[1] === "pm") {
                      optionValue = Number(time.split(":")[0]) + 12;
                      optionKey = Number(time.split(":")[0]) + 12;
                    }

                    return (
                      <option value={optionValue} key={optionKey}>
                        {time}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                Name:
                <input type="text" name="name" value={taskName} />
              </label>
              <label>
                Notes:
                <input type="text" name="notes" value={taskNotes} />
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
