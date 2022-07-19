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
    if (e.target.className === "link") {
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
    }
  }, [location]);
  return (
    <div className="footer-wrapper">
      <ul onClick={selectPage}>
        <p> NAVIGATE</p>
        <li className={navLink === "See All Tasks" ? "selected" : "nav-link"}>
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
            <li className={navLink === "Account" ? "selected" : "nav-link"}>
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
            <li className={navLink === "Login" ? "selected" : "nav-link"}>
              <Link
                id="Login"
                to="/login"
                className="footer-link"
                style={{ textDecoration: "none" }}
              >
                Login<i className="bx bx-chevron-right"></i>
              </Link>
            </li>
            <li className={navLink === "Signup" ? "selected" : "nav-link"}>
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
  );
};

export default Footer;
