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
        <div className="banner stack-top"></div>
      </div>
      <div className="organize">
        <h4>Organize</h4>
        <p>
          {" "}
          Weekly Shedular helps you prioritize what matters, and helps you
          allocate your precious time accordingly. People spend an extraordinary
          amount of time due to lack of organization. Organizing your daily
          schedule can significantly increase productivity and allow you to get
          more things done throughout the day. Simply put organization equals
          productivity!{" "}
        </p>
      </div>
      <div className="schedule">
        <h4>Schedule</h4>
        <p>
          {" "}
          This appliation helps to organize your weekly schedule Lorem ipsum
          dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
          euismod tincidunt ut laoreet dolore magna.{" "}
        </p>
      </div>
      <div className="plan">
        <h4>Strategize</h4>
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
