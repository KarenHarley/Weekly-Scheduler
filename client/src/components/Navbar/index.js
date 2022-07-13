import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [navLink, setNavLink] = useState("");
  console.log("navlink", navLink);
  const logout = () => {
    setNavLink(" ");
    Auth.logout();
  };
  const selectPage = (e) => {
    if (e.target.className === "link") {
      setNavLink(e.target.id);
    }
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <Link to="/">Weekly Shedular</Link>

        <ul className="navbar-ul" onClick={selectPage}>
          <li className={navLink === "See All Tasks" ? "selected" : "nav-link"}>
            <Link
              id="See All Tasks"
              to="/tasks"
              style={{ textDecoration: "none" }}
              className="link"
            >
              See All Tasks
            </Link>
          </li>
          {Auth.loggedIn() ? (
            <>
              <li className={navLink === "Account" ? "selected" : "nav-link"}>
                <Link
                  id="Account"
                  to="/account"
                  style={{ textDecoration: "none" }}
                  className="link"
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
              <li className={navLink === "Login" ? "selected" : "nav-link"}>
                <Link
                  id="Login"
                  to="/login"
                  className="link"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
              </li>
              <li className={navLink === "Signup" ? "selected" : "nav-link"}>
                <Link
                  id="Signup"
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
