import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Navbar = () => {
  const logout = () => {
    console.log("Hi");
    Auth.logout();
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <h4>Weekly Shedular</h4>

        <ul className="navbar-ul">
          <li>
            {" "}
            <Link
              to="/tasks"
              className="link"
              style={{ textDecoration: "none" }}
            >
              See All Tasks
            </Link>
          </li>
          {Auth.loggedIn() ? (
            <>
              <li>
                <Link
                  to="/account"
                  className="link"
                  style={{ textDecoration: "none" }}
                >
                  Account
                </Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="link"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="link"
                  style={{ textDecoration: "none" }}
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
