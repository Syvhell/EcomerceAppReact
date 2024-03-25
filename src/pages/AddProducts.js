import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

export default function AddProducts() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  function createCourse(e) {
    // Prevents page redirection via form submission
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //   important and needed
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        image: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //data is the response of the api/server after it's been process as JS object through our res.json() method.
        console.log(data);
        //data will only contain an email property if we can properly save our user.
        if (data) {
          Swal.fire({
            title: "Add Successful",
            icon: "success",
            text: "Added A Product Successfully",
          });
          navigate("/products");
        } else {
          Swal.fire({
            title: "Try Again",
            icon: "error",
            text: "There is an Error",
          });
        }
      });
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
  }

  useEffect(() => {
    if (name !== "" && description !== "" && price !== "" && image !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [name, description, price, image]);

  return user.isAdmin === true ? (
    <>
      <div className="hero container-fluid vh-100">
        <div className="container">
          <div className="row justify-content-center pt-5">
            <h1 className="text-center">Add Product</h1>
            <p className="fs-6 text-center">
              <i className="fa fa-mobile m-1"></i>moPhie Shop
            </p>
            <Form onSubmit={(e) => createCourse(e)}>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3} // Set the number of visible rows
                placeholder="Enter Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <Form.Label>ImageURL:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ImageURL ONLY"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <div className=" pt-2">
                {isActive ? (
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                ) : (
                  <Button variant="primary" disabled>
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Navigate to="/products" />
  );
}
