import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Navbar = () => {
  const logOut = () => {
    console.log("Hi");
    Auth.logout();
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <h4>Welcome to Weekly Shedular</h4>

        <ul className="navbar-ul">
          <li>
            {" "}
            <Link to="/tasks">See All Tasks</Link>
          </li>
          {Auth.loggedIn() ? (
            <>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <button onClick={logOut}>Log Out</button>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
