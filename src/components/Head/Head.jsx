import logo from "../../assets/logo/logo.png";
import "./Head.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Head({ status, setStatus }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setStatus(false);
    sessionStorage.removeItem("JWTtoken");
  };
  const handleLogin = async () => {
    const token = sessionStorage.getItem("JWTtoken");
    if (!token) {
      navigate("/login");
    } else {
      setStatus(true);
    }
  };
  return (
    <>
      <nav className="navbar">
        {status ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
            to="/profile"
          >
            PROFILE
          </NavLink>
        ) : (
          <Link className="navbar__link" to="/signup">
            SIGN UP
          </Link>
        )}
        <Link to="/" className="navbar__logo-link">
          <img src={logo} alt="WTET" className="navbar__logo-img" />
        </Link>
        {status ? (
          <h3 className="navbar__link" onClick={handleLogout}>
            LOG OUT
          </h3>
        ) : (
          <h3 className="navbar__link" onClick={handleLogin} to="login">
            LOG IN
          </h3>
        )}
      </nav>
    </>
  );
}
