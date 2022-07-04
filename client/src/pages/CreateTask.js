import { useQuery } from "@apollo/client";
//import { QUERY_TASKS } from "../utils/queries";
import { Link } from "react-router-dom";
//import Task from "../components/Task";

const CreateTask = () => {
  const [formState, setFormState] = useState({
    name: "",
    notes: "",
    startingTime: "",
    endingTime: "",
    user: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  return (
    <div className="create-task-wrapper">
      <div className="create-task-heading">
        <h1>Welcome to the Create Tasks Page</h1>
      </div>

      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="task-name"
          value={formState.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          id="task-notes"
          value={formState.notes}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="startingTime"
          placeholder="Start"
          id="task-startingTime"
          value={formState.startingTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endingTime"
          placeholder="End"
          id="task-endingTime"
          value={formState.endingTime}
          onChange={handleChange}
          required
        />
        <input type="submit" onClick={handleFormSubmit} />
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default CreateTask;
