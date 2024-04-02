import { useEffect } from "react";
import logo from "../../assets/logo/logo.png";
import "./Head.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Head({ status, setStatus }) {
  const token = sessionStorage.getItem("JWTtoken");
  const navigate = useNavigate();

  const handleLogout = () => {
    setStatus(false);
    sessionStorage.removeItem("JWTtoken");
    navigate("/");
    window.location.reload();
  };
  const handleLogin = async () => {
    if (!token) {
      navigate("/login");
    } else {
      setStatus(true);
    }
  };

  //check token status
  useEffect(() => {
    if (token) {
      setStatus(true);
    }
  }, [token, setStatus]);

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
