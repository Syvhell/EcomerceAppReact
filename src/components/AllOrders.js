import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./css/AllOrder.css";

export default function AllOrders({ orderedProductArray }) {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  useEffect(() => {
    if (!Array.isArray(orderedProductArray)) {
      console.error("Invalid orderedProductArray format:", orderedProductArray);
      return;
    }

    const ordersArr = orderedProductArray.map((orderedProduct, index) => {
      const productsArr = orderedProduct.products.map((product) => (
        <tr key={product.productId}>
          <td>{product.productId}</td>
          <td>{product.productName}</td>
          <td>{product.quantity}</td>
          {/* Add more columns as needed */}
        </tr>
      ));

      return (
        <div key={index} className="ordered-products-container">
          <h2>Order: {index + 1}</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  {/* Add more columns as needed */}
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
  }, [orderedProductArray]);

  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container vh-100">
      <div className="row">
        <div className="col">
          <h1 className="text-center my-4">Customer Ordered Products</h1>
          <div className="pb-3">
            <Link
              as={NavLink}
              to="/products"
              className="btn btn-success text-white"
              exact
            >
              <i className="fa fa-sign-in m-1"></i>Mophie Products
            </Link>
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
