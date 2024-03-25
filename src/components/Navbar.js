import React from "react";
import "./css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

export default function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg  py-3 shadow-sm  ">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="#">
            <i className="fa fa-mobile m-1"></i>moPhie
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {user.isAdmin ? (
                <></>
              ) : (
                <>
                  <li>
                    <Link
                      className="btn text-white ms-2"
                      as={NavLink}
                      to="/"
                      exact
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn text-white ms-2"
                      as={NavLink}
                      to="/products"
                      exact
                    >
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn text-white ms-2"
                      as={NavLink}
                      to="/about"
                      exact
                    >
                      About
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="buttons">
              {user.id !== null ? (
                <>
                  {user.isAdmin === false ? (
                    <>
                      <Link
                        className="btn btn-outline-dark ms-2"
                        as={NavLink}
                        to="/cart"
                        exact
                      >
                        <i className="fa fa-shopping-cart m-1"> </i>Cart
                      </Link>
                      <Link
                        className="btn btn-outline-dark ms-2"
                        as={NavLink}
                        to="/orders"
                        exact
                      >
                        <i class="fa fa-shopping-bag"></i> MyOrder
                      </Link>
                      <Link
                        className="btn btn-outline-dark ms-2"
                        as={NavLink}
                        to="/profile"
                        exact
                      >
                        <i className="fa fa-user m-1"> </i>Profile
                      </Link>

                      <Link
                        className="btn btn-outline-dark ms-2"
                        as={NavLink}
                        to="/logout"
                        exact
                      >
                        <i className="fa fa-sign-out m-1"> </i>Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className="btn btn-outline-dark ms-2"
                        as={NavLink}
                        to="/products"
                        exact
                      >
                        <i className="fa fa-mobile m-1"> </i>Products
                      </Link>
                      <Link
                        className="btn btn-outline-dark ms-2"
                        as={NavLink}
                        to="/addproduct"
                        exact
                      >
                        <i className="fa fa-plus m-1"> </i>Add Products
                      </Link>
                      <Link
                        className="btn btn-outline-dark ms-2"
                        as={NavLink}
                        to="/profile"
                        exact
                      >
                        <i className="fa fa-user m-1 "> </i>Profile
                      </Link>
                      <Link
                        className="btn btn-outline-dark ms-2"
                        as={NavLink}
                        to="/logout"
                        exact
                      >
                        <i className="fa fa-sign-out m-1"> </i>Logout
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-dark"
                    as={NavLink}
                    to="/login"
                    exact
                  >
                    <i className="fa fa-sign-in m-1"> </i>Login
                  </Link>
                  <Link
                    className="btn btn-outline-dark ms-2"
                    as={NavLink}
                    to="/register"
                    exact
                  >
                    <i className="fa fa-user-plus m-1"> </i>Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
