import React, { useState, useEffect } from "react";
import "./css/AllOrder.css";

export default function CostumerAllOrders({ orderedProductArrayUser }) {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 3;
  const pagesVisited = pageNumber * itemsPerPage;

  useEffect(() => {
    if (!Array.isArray(orderedProductArrayUser)) {
      console.error(
        "Invalid orderedProductArray format:",
        orderedProductArrayUser
      );
      return;
    }

    const ordersArr = orderedProductArrayUser.map((orderedProduct, index) => {
      const productsArr = orderedProduct.products.map((product) => (
        <tr key={product.productId}>
          <td>{product.productId}</td>
          <td>{product.productName}</td>
          <td>{product.quantity}</td>
        </tr>
      ));

      return (
        <div key={index} className="ordered-products-container py-4">
          <h2>Order: {index + 1}</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>{productsArr}</tbody>
            </table>
          </div>
          <p>Total Amount: ₱{orderedProduct.totalAmount}</p>
          <p>
            Purchased On:{" "}
            {new Date(orderedProduct.purchasedOn).toLocaleString()}
          </p>
        </div>
      );
    });

    setOrders(ordersArr);
  }, [orderedProductArrayUser]);

  const pageCount = Math.ceil(orders.length / itemsPerPage);
  return (
    <div className="container vh-100">
      <div className="row">
        <div className="col">
          <h1 className="text-center my-4">Customer Ordered Products</h1>

          <div className="pb-3 ">
            <h5 className="text-center">
              <i className="fa fa-mobile m-1"></i>moPhie
            </h5>
          </div>
          <div className="ordered-products-scroll">
            {orders.slice(pagesVisited, pagesVisited + itemsPerPage)}
          </div>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${pageNumber === 0 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
                >
                  Previous
                </button>
              </li>
              {[...Array(pageCount)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    index === pageNumber ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPageNumber(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  pageNumber === pageCount - 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setPageNumber((prev) => Math.min(prev + 1, pageCount - 1))
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
