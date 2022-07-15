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
      <div className="organize">
        <h4>Organize</h4>
        <p>
          {" "}
          This appliation helps to organize your weekly schedule Lorem ipsum
          dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
          euismod tincidunt ut laoreet dolore magna.{" "}
        </p>
      </div>
    </div>
  );
};

export default Homepage;
