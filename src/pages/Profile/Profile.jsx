import axios from "axios";
import "./Profile.scss";
import { useEffect, useState } from "react";

export default function Profile() {
  const token = sessionStorage.getItem("JWTtoken");
  const [user, setUser] = useState({});

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
