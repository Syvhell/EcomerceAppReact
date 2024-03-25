import { Link } from "react-router-dom";
import "./css/Error.css";

export default function Error({ data }) {
  const { title, description, destination, label } = data;

  return (
    <div
      className="banner-container text-center text-white p-5"
      style={{ backgroundColor: "black" }}
    >
      <h1 className="display-4">{title}</h1>
      <p className="lead">{description}</p>
      <Link className="btn btn-primary text-dark btn-lg" to={destination}>
        {label}
      </Link>
    </div>
  );
}
