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
        {Auth.loggedIn() ? (
          <button onClick={logOut}>Log Out</button>
        ) : (
          <p>
            Please<Link to="/login">login</Link> or{" "}
            <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
