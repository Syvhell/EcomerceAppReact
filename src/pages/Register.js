import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate, useNavigate, Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import "./Register.css";

export default function Register() {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // determine the button is enable
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function registerUser(e) {
    // Prevents page redirection via form submission
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //data is the response of the api/server after it's been process as JS object through our res.json() method.
        console.log(data);
        //data will only contain an email property if we can properly save our user.
        if (data) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");

          Swal.fire({
            title: "Created Account Successfully",
            icon: "success",
            text: "Welcome to Mophie!",
          });
          navigate("/login");
        } else {
          Swal.fire({
            title: "Unsuccesfull",
            icon: "error",
            text: "Try Again!",
          });
        }
      });
  }

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <>
      <div className="hero d-flex justify-content-center align-items-start ">
        <div className="container">
          <div className="row justify-content-center vh-100">
            <form className="row g-3" onSubmit={registerUser}>
              <div>
                <h1>Register</h1>
                <p className="fs-6 text-center">
                  <i className="fa fa-mobile m-1"></i>moPhie Shop
                </p>
              </div>
              <div className="col-md-6">
                <label for="firstname" className="form-label">
                  First Name:
                </label>
                <input
                  className="form-control"
                  id="firstname"
                  type="text"
                  placeholder="Enter First Name"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label for="lastname" className="form-label">
                  Last Name:
                </label>
                <input
                  className="form-control"
                  id="lastname"
                  type="text"
                  placeholder="Enter Last Name"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label for="emailid" className="form-label">
                  Email:
                </label>
                <input
                  className="form-control"
                  id="emailid"
                  type="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label for="mobile" className="form-label">
                  Mobile No:
                </label>
                <input
                  className="form-control"
                  id="mobile"
                  type="number"
                  placeholder="Enter 11 Digit Number"
                  required
                  value={mobileNo}
                  onChange={(e) => {
                    setMobileNo(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label">
                  Password:
                </label>
                <input
                  className="form-control"
                  id="inputPassword4"
                  type="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label for="inputPassword5" className="form-label">
                  Confirm Password:
                </label>
                <input
                  className="form-control"
                  id="inputPassword5"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              <div className="col-12">
                {isActive ? (
                  <button
                    variant="primary"
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    variant="primary"
                    className="btn btn-primary"
                    disabled
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
            <p>
              Already have a moPhie account?{" "}
              <Link as={NavLink} to="/login" exact>
                <i className="fa fa-sign-in m-1"> </i>Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
