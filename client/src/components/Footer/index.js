import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Auth from "../../utils/auth";
const Footer = ({ data }) => {
  console.log(data);
  const location = useLocation();
  const [navLink, setNavLink] = useState("");
  //selected-footer-link
  const logout = () => {
    setNavLink("");
    Auth.logout();
  };
  const selectPage = (e) => {
    if (e.target.className === "footer-link") {
      setNavLink(e.target.id);
    }
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
    <div className="footer-wrapper">
      <div className="child-1">
        <p>
          It is known that using Stephen Covey's Time Management Matrix which
          categorizes tasks on the basis of priority increases productivity and
          efficiency.{" "}
        </p>
        <p>
          This Application uses this Matrix to help you distinguish between
          importance and urgency.
        </p>
      </div>
      <div className="child-2">
        <ul onClick={selectPage}>
          <p> NAVIGATE</p>
          <li
            className={
              navLink === "See All Tasks" ? "footer-selected" : "nav-link"
            }
          >
            {" "}
            <Link
              id="See All Tasks"
              to="/tasks"
              style={{ textDecoration: "none" }}
              className="footer-link"
            >
              See All Tasks<i className="bx bx-chevron-right"></i>
            </Link>
          </li>
          {Auth.loggedIn() ? (
            <>
              <li
                className={
                  navLink === "Account" ? "footer-selected" : "nav-link"
                }
              >
                <Link
                  id="Account"
                  to="/account"
                  style={{ textDecoration: "none" }}
                  className="footer-link"
                >
                  Account<i className="bx bx-chevron-right"></i>
                </Link>
              </li>
              <li className="footer-btn">
                <button className="footer-link" onClick={logout}>
                  Logout<i className="bx bx-chevron-right"></i>
                </button>
              </li>
            </>
          ) : (
            <>
              <li
                className={navLink === "Login" ? "footer-selected" : "nav-link"}
              >
                <Link
                  id="Login"
                  to="/login"
                  className="footer-link"
                  style={{ textDecoration: "none" }}
                >
                  Login<i className="bx bx-chevron-right"></i>
                </Link>
              </li>
              <li
                className={
                  navLink === "Signup" ? "footer-selected" : "nav-link"
                }
              >
                <Link
                  id="Signup"
                  to="/signup"
                  className="footer-link"
                  style={{ textDecoration: "none" }}
                >
                  Sign up<i className="bx bx-chevron-right"></i>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="child-3">
        <p>Select the correct Quadrant when creating a task!</p>
        <ul>
          <li>Q1: Important/Urgent</li>
          <li>Q2: Important/NOT Urgent</li>
          <li>Q3: NOT Important/Urgent</li>
          <li>Q4: NOT Important/NOT Urgent</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
