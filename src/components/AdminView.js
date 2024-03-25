import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import EditProduct from "./EditProduct";
import ActivateProduct from "./ActivateProduct";
import "./css/AdminView.css";

export default function AdminView({ productsData, fetchData }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = productsData.slice(startIndex, endIndex);

    const productsArr = slicedData.map((product) => (
      <tr key={product._id}>
        <td>{product._id}</td>
        <td>{product.name}</td>
        <td className="description-cell">{product.description}</td>
        <td>{product.price}</td>
        <td className={product.isActive ? "text-success" : "text-danger"}>
          {product.isActive ? "Available" : "Unavailable"}
        </td>
        <td>
          <EditProduct product={product._id} fetchData={fetchData} />
        </td>
        <td>
          <ActivateProduct
            product={product._id}
            isActive={product.isActive}
            fetchData={fetchData}
          />
        </td>
      </tr>
    ));

    setProduct(productsArr);
  }, [productsData, currentPage]);

  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  return (
    <div className="admin-view-container vh-100 d-flex flex-column">
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <div className="pb-3 d-flex justify-content-center">
        <Link
          as={NavLink}
          to="/orders"
          className="btn bg-success text-white"
          exact
        >
          <i className="fa fa-sign-in m-1"></i>Customer Orders
        </Link>
      </div>
      <div className="table-responsive flex-grow-1">
        <table className="table table-striped table-bordered table-hover table-dark">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Availability</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </table>
      </div>
      <div className="pagination-container">
        <nav aria-label="Page navigation">
          <ul className="pagination pagination-dark justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Prev
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
