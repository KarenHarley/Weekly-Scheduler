import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Homepage = () => {
  const logOut = () => {
    console.log("Hi");
    Auth.logout();
  };

  return (
    <div className="homepage-wrapper">
      <div className="homepage-heading">
        <h1>Welcome to Weekly Shedular</h1>
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Homepage;
