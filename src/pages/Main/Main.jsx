import "./Main.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

//import img
import machine from "../../assets/logo/machine.png";
import lever from "../../assets/logo/lever.png";
import to from "../../assets/logo/to.png";

export default function Main() {
  const [user, setUser] = useState({});
  const [options, setOptions] = useState([]);
  const [food, setFood] = useState("");
  const [roll, setRoll] = useState(false);
  const [location, setLocation] = useState("");

  const list = [
    "Pho",
    "Spicy soup noodle",
    "Steak",
    "Sushi rolls",
    "Dim sum",
    "Poutine",
    "Butter chicken",
    "Ramen",
    "Fish and chips",
    "Pad Thai",
    "Korean BBQ",
    "Tacos",
    "Pizza",
    "Burger",
  ];

  const token = sessionStorage.getItem("JWTtoken");

  const handleRoll = async (e) => {
    e.preventDefault();
    if (food !== "") {
      setFood("");
      setOptions([]);
    }
    setRoll(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/food/random`,
        location,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const restaurantList = response.data.restaurants;
      if (restaurantList.length > 0) {
        setOptions(restaurantList);
      }
      setFood(response.data.name);
    } catch (error) {
      console.log("Error at get random food ", error);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setRoll(false);
    setOptions([]);
  };

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
        });
      } catch (error) {
        console.log("Error at getting user's info ", error);
      }
    };
    if (token) {
      getUserInfo();
    }
  }, [token]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  });

  return (
    <div className="main">
      <div className="main__info">
        <h4>Welcome,</h4>
        {token ? (
          <NavLink to="/profile">{` ${user.name}`}</NavLink>
        ) : (
          <span>Visitor</span>
        )}
      </div>
      <div className="main__slot">
        <img className="main__machine" src={machine} alt="machine" />
        {roll ? (
          <div>
            <img className="main__lever" src={lever} alt="lever" />
          </div>
        ) : (
          <div onClick={handleRoll}>
            <img
              className="main__lever main__lever--active"
              src={lever}
              alt="lever"
            />
          </div>
        )}
        <div className="main__food">
          {roll ? (
            <div className="main__rolling">
              <div className="main__texts">
                {list.map((item, index) => {
                  return <p key={index}>{`${item}`}</p>;
                })}
                <p style={{ fontWeight: "600" }}>{`${food}`}</p>
              </div>
            </div>
          ) : (
            <h4 className="main__bling">Get your food now!</h4>
          )}
        </div>
        {roll ? (
          <button
            className="main__reset main__reset--active"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : (
          <button className="main__reset" onClick={handleReset}>
            Reset
          </button>
        )}
        <div className="main__restaurant">
          {options.map((option, index) => {
            return (
              <div className="main__option" key={index}>
                <div className="main__option-left">
                  <h3>{option.name}</h3>
                  <p>{option.address}</p>
                  {option.open ? (
                    <p style={{ color: "green", fontWeight: "600" }}>
                      Open Now
                    </p>
                  ) : (
                    <p>Closed</p>
                  )}
                </div>
                <div className="main__option-right">
                  <span>{option.distance}</span>
                  <a
                    target="_blank"
                    href={`https://www.google.com/maps/search/${encodeURIComponent(
                      option.name + "" + option.address
                    )}`}
                  >
                    <img src={to} alt="to" className="main__to" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
