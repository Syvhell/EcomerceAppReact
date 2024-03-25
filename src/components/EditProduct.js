import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditProduct({ product, fetchData }) {
  const [productId, setProductId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const editProduct = (e, productId) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_API_URL}/products/${productId}/update-product`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
          image: image,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Products Successfully Updated",
          });
          closeEdit();
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });
          closeEdit();
          fetchData();
        }
      });
  };

  const openEdit = (productId) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/products/${productId}/single-product`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductId(data._id);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImage(data.image);
      });
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription("");
    setPrice(0);
    setImage("");
  };

  const renderHeader = () => (
    <Modal.Header closeButton>
      <Modal.Title>Edit Product</Modal.Title>
    </Modal.Header>
  );

  const renderBody = () => (
    <Modal.Body>
      <Form.Group controlId="courseName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="courseDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3} // Set the number of visible rows
          placeholder="Enter Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="coursePrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>ImageURL:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter ImageURL ONLY"
          required
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </Form.Group>
    </Modal.Body>
  );

  const renderFooter = () => (
    <Modal.Footer>
      <Button variant="primary" size="sm" onClick={closeEdit}>
        Close
      </Button>
      <Button variant="success" type="submit">
        Submit
      </Button>
    </Modal.Footer>
  );

  return (
    <>
      <Button
        variant="primay"
        className=" btn-primary"
        size="sm"
        onClick={() => openEdit(product)}
      >
        Edit
      </Button>
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editProduct(e, productId)}>
          {renderHeader()}
          {renderBody()}
          {renderFooter()}
        </Form>
      </Modal>
    </>
  );
}
