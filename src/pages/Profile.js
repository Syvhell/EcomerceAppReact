import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import "./Profile.css";
import ResetPassword from "../components/ResetPassword";
import UpdateProfile from "../components/UpdateProfile";
import Footer from "../components/Footer";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});

  const fetchProfile = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/user-details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (typeof data._id !== "undefined") {
          setDetails(data);
        }
      });
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return user.id === null ? (
    <Navigate to="/" />
  ) : (
    <>
      <div className="body d-flex justify-content-center align-items-center pt-5 ">
        <div className="container mt-5">
          <div className="card">
            <div className="card-header text-white text-center">
              <h3>User Profile</h3>
            </div>
            <div className="card-body text-center">
              <i className="user fa fa-user fa-5x mb-4"></i>
              <h4 className="text-white">
                User Name: {`${details.firstName} ${details.lastName}`}
              </h4>
              <p>Email: {details.email}</p>
              <p>Phone: {details.mobileNo}</p>
            </div>
          </div>
        </div>
        <ResetPassword />
        <UpdateProfile fetchProfile={fetchProfile} />
      </div>
      <Footer />
    </>
  );
}
