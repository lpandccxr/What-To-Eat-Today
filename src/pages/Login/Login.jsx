import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        formData
      );
      await sessionStorage.setItem("JWTtoken", response.data.token);
      setTimeout(() => {
        setLoading(false);
        setLogin(true);
        navigate("/");
      }, 500);
    } catch (error) {
      alert("User/Name is wrong");
      setLoading(false);
      console.log("Error at log in ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <div className="inputForm__block">
          <label className="inputForm__label">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="inputForm__input"
            autoComplete="off"
            required
          />
        </div>
        <div className="inputForm__block">
          <label className="inputForm__label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="inputForm__input"
            required
          />
        </div>
        <div className="inputForm__button-container">
          <button className="inputForm__button" type="submit">
            {loading ? `loading..` : `Log In`}
          </button>
        </div>
      </form>
    </>
  );
}
