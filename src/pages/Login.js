import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate, Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import "./Login.css";
export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        // there is no authorization here because it is log in
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.access !== "undefined") {
          // this will set the token to the localStorage
          localStorage.setItem("token", data.access);
          // this will retrive the user details data.access will be pass in the function const retrieveUserDetails
          retrieveUserDetails(data.access);
          setUser({
            access: localStorage.getItem("token"),
          });
          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome to Mophie!",
          });
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again.",
          });
        }
      });

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/user-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <>
      <div className="body">
        <div className="d-flex justify-content-center align-items-start vh-100 pt-5">
          <form onSubmit={(e) => authenticate(e)}>
            <div className="text-center">
              <h1>LogIn</h1>
              <p className="fs-6">
                <i className="fa fa-mobile m-1"></i>moPhie Shop
              </p>
            </div>

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div id="emailHelp" className="form-text text-warning">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="btn my-3"
              type="submit"
              id="submitBtn"
              disabled={!isActive}
            >
              Submit
            </button>
            <p>
              No moPhie account?{" "}
              <Link as={NavLink} to="/register" exact>
                <i className="fa fa-user-plus m-1"> </i>Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
