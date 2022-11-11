import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { GET_CLIENTS } from "../queries/clientQueries";
import { PROJECT_FRAGMENT } from "../queries/projectQueries";

const AddProjectModal = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update: (cache, { data: { addProject: addProjectData } }) => {
      cache.modify({
        fields: {
          projects: (projects) => {
            // cache.readFragment({
            // fragment: PROJECT_FRAGMENT,
            // });
            const newProjectRef = cache.writeFragment({
              data: addProjectData,
              fragment: PROJECT_FRAGMENT,
            });
            return [...projects, newProjectRef];
          },
        },
      });
    },
  });

  //get client for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    addProject(name, description, clientId, status);

    setName("");
    setDescription("");
    setClientId("");
    setStatus("new");
  };

  if (loading) return null;
  if (error) return <p>Something Went Wrong...</p>;
  //

  return (
    <>
      {!loading && !error && (
        <>
          <Button variant="primary  mt-3" onClick={handleShow}>
            <div className="d-flex align-items-center">
              <FaList className="icon me-2" />
              <div>New Project</div>
            </div>
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Project</Modal.Title>
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
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Type a description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Status</option>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="done">Completed</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Client</Form.Label>
                  <Form.Select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option>Client</option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClose}>
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
