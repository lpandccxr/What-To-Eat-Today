import { useEffect, useState } from "react";
import "./Signup.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [confirmP, setConfirmP] = useState("");
  const [confirm, setConfirm] = useState(true);
  const [goodEmail, setGoodEmail] = useState(true);
  const [passEmail, setPassEmail] = useState(true);
  const [goodUser, setGoodUser] = useState(true);
  const [shortUser, setShortUser] = useState(false);
  const [goodPw, setGoodPw] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmP = (e) => {
    const password = e.target.value;
    setConfirmP(password);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkUser = async (user) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/check-username/${user}`
      );
      setGoodUser(response.data.success);
    } catch (error) {
      console.log("error at check user ", error);
    }
  };

  const checkEmail = async (email) => {
    if (goodEmail && email !== "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/check-email/${email}`
        );
        console.log(response.data);
        setPassEmail(response.data.success);
      } catch (error) {
        console.log("error at check eamil ", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !confirm ||
      !goodEmail ||
      !passEmail ||
      !goodUser ||
      shortUser ||
      !goodPw
    ) {
      setLoading(false);
      return alert("Please correct your input information");
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        formData
      );
      setLoading(false);
      console.log(response.data);
      if (response.data.success) {
        alert("Sign up successful! Heading to Login");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error at signup ", error);
    }
  };

  //check username's length and if it's exist
  useEffect(() => {
    if (formData.username.length >= 4) {
      setShortUser(false);
      checkUser(formData.username);
    } else if (formData.username === "") {
      setShortUser(false);
    } else {
      setShortUser(true);
    }
  }, [formData.username]);

  useEffect(() => {
    if (formData.password === confirmP || confirmP === "") {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  }, [formData.password, confirmP]);

  useEffect(() => {
    if (validateEmail(formData.email)) {
      setGoodEmail(true);
      checkEmail(formData.email);
    } else if (formData.email === "") {
      setGoodEmail(true);
    } else {
      setGoodEmail(false);
    }
  }, [formData.email]);

  //check password length
  useEffect(() => {
    if (formData.password.length < 8) {
      setGoodPw(false);
    } else {
      setGoodPw(true);
    }
  });

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
            placeholder="Please input at least 4 characters"
            required
          />
          {goodUser ? (
            <></>
          ) : (
            <span className="inputForm__status"> existed!</span>
          )}
          {shortUser ? (
            <span className="inputForm__status"> too short!</span>
          ) : (
            <></>
          )}
          {!shortUser && goodUser && formData.username !== "" ? (
            <span>✔</span>
          ) : (
            <></>
          )}
        </div>
        <div className="inputForm__block">
          <label className="inputForm__label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="inputForm__input"
            autoComplete="off"
            placeholder="eg. Raven Lei"
            required
          />
        </div>
        <div className="inputForm__block">
          <label className="inputForm__label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="inputForm__input"
            placeholder="eg. 12345@gmail.com"
            autoComplete="off"
            required
          />
          {goodEmail ? (
            <></>
          ) : (
            <span className="inputForm__status">invaild email</span>
          )}
          {passEmail ? (
            <></>
          ) : (
            <span className="inputForm__status"> X registered</span>
          )}
          {passEmail && goodEmail && formData.email !== "" ? (
            <span>✔</span>
          ) : (
            <></>
          )}
        </div>
        <div className="inputForm__block">
          <label className="inputForm__label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="inputForm__input"
            placeholder="Please input at least 8 characters"
            required
          />
          {goodPw ? <span>✔</span> : <></>}
          {!goodPw && formData.password !== "" ? (
            <span className="inputForm__status"> too short!</span>
          ) : (
            <></>
          )}
        </div>
        <div className="inputForm__block">
          <label className="inputForm__label">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmP}
            onChange={handleConfirmP}
            className="inputForm__input"
            placeholder="**************"
            required
          />
          {confirm ? (
            <></>
          ) : (
            <span className="inputForm__status">not match</span>
          )}
          {confirm && confirmP !== "" ? <span>✔</span> : <></>}
        </div>
        <div className="inputForm__button-container">
          <button className="inputForm__button" type="submit">
            {loading ? `loading..` : `Register`}
          </button>
        </div>
      </form>
    </>
  );
}
