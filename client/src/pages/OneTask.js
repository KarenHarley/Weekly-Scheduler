import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../utils/queries";
import { useParams } from "react-router-dom";
const OneTask = () => {
  const params = useParams();
  console.log(params.id);
  
  const { loading, data } = useQuery(QUERY_TASKS, {
    variables: {
      userId: id,
    },
  });
  console.log(data);
  return (
    <div className="task-wrapper">
      <div className="task-heading">
        <h1>One task</h1>
        {loading ? <div>Loading...</div> : <div></div>}
      </div>
    </div>
  );
};

export default OneTask;
