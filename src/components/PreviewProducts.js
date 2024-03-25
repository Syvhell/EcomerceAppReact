import React from "react";
import "./css/PreviewProducts.css";

export default function PreviewProducts(props, { cartHandleClickAdd }) {
  const { data } = props;

  const { _id, name, price, image } = data;

  return (
    <div className="col-md-2 col-sm-4 mb-3">
      <div className="card h-100 text-center p-3 bg-dark " key={_id}>
        <img src={image} className="card-img-top img-fluid" alt={name} />
        <div className="card-body">
          <h6 className="card-title text-white">{name}</h6>
          <p className="text-white small">₱{price}</p>
          <div className="my-2">
            <a
              href={`/product/${_id}`}
              className="btn btn-primary text-dark d-block"
            >
              Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
