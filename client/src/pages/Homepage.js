import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Homepage = () => {
  return (
    <div className="homepage-wrapper">
      <div className="homepage-heading">
        <h1>Welcome to Weekly Shedular</h1>
      </div>
      <div className="banner-container">
        <div className="banner">
          <img src="./Pics/banner.jpg"></img>
        </div>
        <div className="banner stack-top">Hello this is the aside div</div>
      </div>
    </div>
  );
};

export default Homepage;
