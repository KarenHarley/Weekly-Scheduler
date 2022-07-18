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
          Scheduling which is an aspect of organization takes things up a notch. It helps you get clear on what your purpose and objectives are. Rather than just spinning wheels, having a good schedule ensures that all our goals are identified and will be tackled. Scheduling also fights against for crastination by having a specific time frame to complete a task. 
         {" "}
        </p>
      </div>
      <div className="plan">
        <h4>Strategize</h4>
        <p>
          {" "}
          {" "}
        </p>
      </div>
    </div>
  );
};

export default Homepage;
