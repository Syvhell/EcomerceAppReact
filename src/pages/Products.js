import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import Footer from "../components/Footer";
import Highlights from "../components/Highlights";
import "./Products.css";

export default function Products({ cartHandleClickAdd }) {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all-product-admin`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return user.isAdmin === true ? (
    <>
      <div className="hero container-fluid ">
        <div className="container">
          <div className="row justify-content-center">
            <AdminView productsData={products} fetchData={fetchData} />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  ) : (
    <>
      <div className="hero container-fluid py-4 ">
        <div className="container">
          <div className="row justify-content-center">
            <UserView
              productsData={products}
              cartHandleClickAdd={cartHandleClickAdd}
            />
          </div>
        </div>
      </div>
      <div>
        <Highlights />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
