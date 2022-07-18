import { Link, useLocation } from "react-router-dom";

const Footer = ({ data }) => {
  console.log(data);
  const location = useLocation();
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
