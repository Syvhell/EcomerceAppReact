import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import Footer from "../components/Footer";
import AllOrders from "../components/AllOrders";
import CostumerOrder from "../components/CostumerAllOrders";
import { Navigate } from "react-router-dom";

export default function Orders() {
  const { user } = useContext(UserContext);

  const [orderedProductArray, setOrderedProductArray] = useState([]);
  const [orderedProductArrayUser, setOrderedProductArrayUser] = useState([]);

  // Fetch the ordered product array data
  useEffect(() => {
    // Replace this with your actual fetch logic
    const fetchDataOrdersAdmin = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/get-all-orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setOrderedProductArray(data);
      } catch (error) {
        console.error("Error fetching ordered products:", error);
      }
    };

    fetchDataOrdersAdmin();
  }, []);

  useEffect(() => {
    // Replace this with your actual fetch logic
    const fetchDataOrderUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setOrderedProductArrayUser(data);
      } catch (error) {
        console.error("Error fetching ordered products:", error);
      }
    };

    fetchDataOrderUser();
  }, []);

  return user.id !== null ? (
    <>
      {user.isAdmin === true ? (
        <>
          <div className="hero container-fluid ">
            <div className="container">
              <div className="row justify-content-center">
                <AllOrders orderedProductArray={orderedProductArray} />
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </>
      ) : (
        <>
          <div className="hero container-fluid ">
            <div className="container">
              <div className="row justify-content-center">
                <CostumerOrder
                  orderedProductArrayUser={orderedProductArrayUser}
                />
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </>
      )}
    </>
  ) : (
    <Navigate to="/products" />
  );
}
