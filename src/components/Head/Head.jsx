import logo from "../../assets/logo/logo.png";
import "./Head.scss";
import { Link } from "react-router-dom";

export default function Head() {
  return (
    <>
      <nav className="navbar">
        <h3 className="navbar__link">SIGN UP</h3>
        <Link to="/" className="navbar__logo-link">
          <img src={logo} alt="WTET" className="navbar__logo-img" />
        </Link>
        <h3 className="navbar__link">LOG IN</h3>
      </nav>
    </>
  );
}
