import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./css/HomeProductCard.css";
import UserContext from "../UserContext";

export default function ProductCard(productProp) {
  const { data } = productProp;
  const { _id, name, price, image } = data;
  const { user } = useContext(UserContext);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
      <div className="card h-100 text-center p-3 bg-dark custom-card-width">
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
        </div>
      </div>
    </div>
  );
}
