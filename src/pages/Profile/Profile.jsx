import axios from "axios";
import "./Profile.scss";
import { useEffect } from "react";

export default function Profile() {
  const token = sessionStorage.getItem("JWTtoken");

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
        console.log(response.data);
      } catch (error) {
        console.log("Error at getting user's info ", error);
      }
    };
    getUserInfo();
  }, [token]);

  return <div className="profile">Profile</div>;
}
