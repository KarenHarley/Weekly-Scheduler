import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Homepage = () => {
  console.log(Auth.getProfile());
  return (
    <div className="homepage-wrapper">
      <div className="homepage-heading">
        <h1>Welcome to Weekly Shedular</h1>
      </div>
    </div>
  );
};

export default Homepage;
