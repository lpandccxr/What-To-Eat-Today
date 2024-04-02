import axios from "axios";
import "./Profile.scss";
import { useEffect, useState } from "react";

export default function Profile() {
  const token = sessionStorage.getItem("JWTtoken");
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/add-food`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({
        name: "",
        country: "",
      });
      alert(`${response.data.name} has been added`);
    } catch (error) {
      alert("Food is exist!");
      console.log(error);
    }
  };

  const formatTime = (input) => {
    const date = new Date(input).toLocaleDateString("en-US");
    const time = new Date(input).toLocaleTimeString("en-US");
    return `${date} ${time}`;
  };

  //retrive user's profile when mount
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser({
          ...response.data,
          record: JSON.parse(response.data.record),
          last_login: `${formatTime(response.data.last_login)}`,
        });
      } catch (error) {
        console.log("Error at getting user's info ", error);
      }
    };
    getUserInfo();
  }, [token]);

  return (
    <div className="profile">
      <h2>{`Welcome ${user.name} !`}</h2>
      <div className="profile__content">
        <p>{`Email: ${user.email}`}</p>
        <p>{`Last login: ${user.last_login}`}</p>

        <div className="profile__add">
          <h3>Add food to your list</h3>
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__input-block">
              <label className="profile__label">Food:</label>
              <input
                className="profile__input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="eg. Pho"
                autoComplete="off"
                required
              />
            </div>
            <div className="profile__input-block">
              <label className="profile__label">Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="profile__input"
                placeholder="Country which the food comes from"
                autoComplete="off"
                required
              />
            </div>
            <button className="profile__button">Submit</button>
          </form>
        </div>
        {user.record ? (
          <div className="profile__record">
            <h3>{`< Record >`}</h3>
            <div className="profile__item profile__item--top">
              <h4 className="profile__item-name">Food</h4>
              <h4>Time</h4>
            </div>
            {user.record.map((item, index) => {
              while (index <= 10) {
                return (
                  <div key={item.id} className="profile__item">
                    <span className="profile__item-name">{item.name}</span>
                    <span>{formatTime(Number(item.timestamp))}</span>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
