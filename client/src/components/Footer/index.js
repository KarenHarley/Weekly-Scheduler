import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
const Footer = ({ data }) => {
  console.log(data);
  const location = useLocation();

  useEffect(() => {
    // If navbar is not used to change page (like if a link is used)
    //state will still be updated
    switch (location.pathname) {
      case "/tasks":
        console.log(location);
        return;
      case "/login":
        console.log(location);
        return;
      case "/signup":
        console.log(location);
        return;
      case "/":
        console.log(location);
        return;
      case "/account":
        console.log(location);
        return;
    }
  }, [location]);
  return (
    <div className="footer-wrapper">
      <ul>
        <li>
          {" "}
          <Link
            id="See All Tasks"
            to="/tasks"
            style={{ textDecoration: "none" }}
            className="footer-link"
          >
            See All Tasks
          </Link>
        </li>
        <li>
          <Link
            id="Login"
            to="/login"
            className="footer-link"
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            id="Signup"
            to="/signup"
            className="footer-link"
            style={{ textDecoration: "none" }}
          >
            Sign up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
