import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UPDATE_PROJECT } from "../mutations/projectMutation";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    //     update: (cache, { data: { updateProject } }) => {
    //         const { projects } = cache.readQuery({ query: GET_PROJECT });
    //         cache.writeQuery({
    //             query: GET_PROJECT,
    //             data: { projects: projects.map(p => p.id === updateProject.id) ? {...projects, updateProject} : projects }
    //         });
    //        }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    updateProject(name, description, status);
  };
  return (
    <div className="mt-5">
      <h1>Update Project Details</h1>
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

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditProjectForm;
