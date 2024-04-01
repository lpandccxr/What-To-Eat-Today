import logo from "../../assets/logo/logo.png";
import "./Head.scss";
import { Link } from "react-router-dom";

export default function Head({ status, setStatus }) {
  const handleClick = () => {
    setStatus(false);
  };
  return (
    <>
      <nav className="navbar">
        {status ? (
          <Link className="navbar__link" to="/profile">
            PROFILE
          </Link>
        ) : (
          <Link className="navbar__link" to="/signup">
            SIGN UP
          </Link>
        )}
        <Link to="/" className="navbar__logo-link">
          <img src={logo} alt="WTET" className="navbar__logo-img" />
        </Link>
        {status ? (
          <h3 className="navbar__link" onClick={handleClick}>
            LOG OUT
          </h3>
        ) : (
          <Link className="navbar__link" to="login">
            LOG IN
          </Link>
        )}
      </nav>
    </>
  );
}
