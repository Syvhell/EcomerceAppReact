import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import "./css/ProductCard.css";

export default function ProductCard({ productProp, cartHandleClickAdd }) {
  const { _id, name, price, image } = productProp;
  const { user } = useContext(UserContext);

  return (
    <div className="col-md-2 col-sm-4 mb-3">
      <div className="card h-100 text-center p-3 bg-dark " key={_id}>
        <img src={image} className="card-img-top img-fluid" alt={name} />
        <div className="card-body">
          <h6 className="card-title text-white">{name}</h6>
          <p className="text-white small">₱{price}</p>
          <div className="my-2">
            <Link to={`/product/${_id}`}>
              <a
                href="#"
                className="buy-now-btn btn btn-primary btn-sm align-bottom"
              >
                Details
              </a>
            </Link>
          </div>
          {user.id !== null && (
            <div>
              <button
                className="align-bottom bg-transparent btn btn-sm d-flex"
                onClick={() => cartHandleClickAdd(productProp)}
              >
                <i className="fa fa-cart-plus m-1"></i>
                <p>Cart</p>
                <i className="fa fa-plus m-1"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
