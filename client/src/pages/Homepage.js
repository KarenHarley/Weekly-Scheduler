import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Homepage = () => {
  return (
    <div className="homepage-wrapper">
      <div className="homepage-heading">
        <h1>Welcome to Weekly Shedular</h1>
        <img src="./Pics/banner.jpg"></img>
      </div>
    </div>
  );
};

export default Homepage;
