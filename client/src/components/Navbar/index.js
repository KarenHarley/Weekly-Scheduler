import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [navLink, setNavLink] = useState("See All Tasks");
  console.log("navlink", navLink);
  const logout = () => {
    console.log("Hi");
    Auth.logout();
  };
  const selectPage = (e) => {
    console.log(e);
    console.log(e.target.type);
    if (e.target.type === "li") {
      console.log(e.target.id);
      setNavLink(e.target.id);
    }
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <h4>Weekly Shedular</h4>

        <ul className="navbar-ul" onClick={selectPage}>
          <li id="See All Tasks" type="li">
            <Link
              to="/tasks"
              className={navLink === "See All Tasks" ? "selected" : "nav-link"}
              style={{ textDecoration: "none" }}
            >
              See All Tasks
            </Link>
          </li>
          {Auth.loggedIn() ? (
            <>
              <li
                id="Account"
                type="li"
                className={navLink === "Account" ? "selected" : "nav-link"}
              >
                <Link
                  to="/account"
                  style={{ textDecoration: "none" }}
                  className="link"
                >
                  Account
                </Link>
              </li>
              <li
                id="Logout"
                type="li"
                className={navLink === "Logout" ? "selected" : "nav-link"}
              >
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li
                id="Login"
                type="li"
                className={navLink === "Login" ? "selected" : "nav-link"}
              >
                <Link
                  to="/login"
                  className="link"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
              </li>
              <li
                id="Signup"
                type="li"
                className={navLink === "Signup" ? "selected" : "nav-link"}
              >
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
