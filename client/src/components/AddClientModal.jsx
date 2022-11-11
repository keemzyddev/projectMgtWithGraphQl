import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutation";
import { CLIENT_FRAGMENT } from "../queries/clientQueries";
import { Alert } from "react-bootstrap";

const AddClientModal = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update: (cache, { data: { addClient: addClientData } }) => {
      cache.modify({
        fields: {
          clients: (clients) => {
            // cache.readFragment({
            // fragment: CLIENT_FRAGMENT,
            // });
            const newClientRef = cache.writeFragment({
              data: addClientData,
              fragment: CLIENT_FRAGMENT,
            });
            return [...clients, newClientRef];
          },
        },
      });
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      return Alert("Please fill in all fields");
    }

    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <Button variant="secondary  mt-3" onClick={handleShow}>
        <div className="d-flex align-items-center">
          <FaUser className="icon me-2" />
          <div>Add Client</div>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddClientModal;
