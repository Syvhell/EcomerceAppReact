import React, { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartItemsPrice, setTotalCartItemsPrice] = useState(0);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items and total price from the server
  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/get-all-cart-items`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCartItems(data.cart);
        setTotalCartItemsPrice(data.cartItemsTotal);

        // Count total unique items in the cart
        const totalItems = data.cart.length;
        setTotalItemsInCart(totalItems);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Add to cart function
  const addToCart = async (productId, quantity, operation) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            productId,
            quantity,
            operation,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCartItems(data.cart);
        setTotalCartItemsPrice(data.cartItemsTotal);
        // Fetch cart items again after the update
        fetchCartItems();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Checkout function
  const checkoutCart = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/cart-checkout-orders`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("Order created successfully:", data.message);
        // Optionally, you can clear the local cart state after successful checkout
        setCartItems([]);
        setTotalCartItemsPrice(0);
        // Fetch cart items again after the update
        fetchCartItems();
        Swal.fire({
          title: "Checked Out Successfully",
          icon: "success",
          text: "Happy Shopping!",
        });
        navigate("/orders");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error checking out cart:", error);
    }
  };

  const handleQuantityChange = (productId, quantityChange) => {
    const newQuantity =
      cartItems.find((item) => item.productId === productId).quantity +
      quantityChange;
    addToCart(productId, newQuantity, "add");
  };
  const handleRemoveChange = (productId, quantityChange) => {
    const newQuantity =
      cartItems.find((item) => item.productId === productId).quantity +
      quantityChange;
    addToCart(productId, newQuantity, "remove");
  };

  useEffect(() => {
    fetchCartItems();
  }, []); // Fetch cart items on component mount

  return user.id !== null ? (
    <>
      <div className="hero container-fluid">
        <div className="container">
          <div className="row justify-content-center">
            <div className="hero container py-5 vh-100">
              <h1 className="text-white ">
                <i className="fa fa-shopping-cart m-1 text-warning"> </i>Your
                Mophie Cart
              </h1>
              {cartItems.length > 0 ? (
                <>
                  <ul className="list-group text-dark">
                    {cartItems.map((item) => (
                      <li
                        key={item.productId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="text-dark">
                          {item.productName} - Quantity: {item.quantity} -
                          Subtotal: ₱{item.subtotal}
                        </div>
                        <div className="btn-group">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() =>
                              handleQuantityChange(item.productId, -1)
                            }
                            disabled={item.quantity <= 1} // Disable if quantity is already 1
                          >
                            -
                          </button>
                          <span className="btn btn-outline-primary">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-dark"
                            onClick={() =>
                              handleQuantityChange(item.productId, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <div>
                          <button
                            className="btn bg-danger"
                            onClick={() =>
                              handleRemoveChange(item.productId, -1)
                            }
                            disabled={item.quantity <= 0} // Disable if quantity is already 1
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-white ">
                    Total Price: ₱{totalCartItemsPrice}
                  </h3>
                  <button
                    className="btn btn-primary text-dark"
                    onClick={() => checkoutCart()}
                  >
                    Checkout
                  </button>
                </>
              ) : (
                <h3 className="text-white">Your cart is empty.</h3>
              )}
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/products" />
  );
};

export default Cart;
