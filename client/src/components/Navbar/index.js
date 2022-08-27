import { Link, useParams, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";
import { useState, useEffect } from "react";
const Navbar = () => {
  const location = useLocation();
  const [navLink, setNavLink] = useState("");
  const [navbarOpen, setNavbarOpen] = useState(false);

  console.log(navbarOpen);
  const logout = () => {
    setNavLink("");
    Auth.logout();
  };
  const selectPage = (e) => {
    if (e.target.className === "link") {
      setNavLink(e.target.id);
    }
  };
  const toggleMenu = () => {
    setNavbarOpen((prev) => !prev);
    console.log(navbarOpen);
  };
  useEffect(() => {
    // If navbar is not used to change page (like if a link is used)
    //state will still be updated
    switch (location.pathname) {
      case "/tasks":
        setNavLink("See All Tasks");
        return;
      case "/login":
        setNavLink("Login");
        return;
      case "/signup":
        setNavLink("Signup");
        return;
      case "/":
        setNavLink("");
        return;
      case "/account":
        setNavLink("Account");
        return;
      default:
        setNavLink("");
    }
  }, [location]);
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <Link className="link" to="/">
          Weekly Shedular
        </Link>
        <div className="link-menu">
          <div className="hamburger-icon-div" onClick={toggleMenu}>
            <i className="bx bx-menu"></i>
          </div>
          <ul
            onClick={selectPage}
            className={navbarOpen === false ? "hide-nav " : "navbar-ul"}
          >
            <li
              className={navLink === "See All Tasks" ? "selected" : "nav-link"}
            >
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
                {location.pathname == "/tasks" ? (
                  <li className="nav-link">
                    <Link
                      id="create"
                      style={{ textDecoration: "none" }}
                      className="link"
                    >
                      Create Task
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
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
                  <button className="link" onClick={logout}>
                    Logout
                  </button>
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
    </div>
  );
};

export default Navbar;
