import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { Button } from "react-bootstrap";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),

    update: (cache, { data: { deleteProject } }) => {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter(
            (project) => project.id !== deleteProject.id
          ),
        },
      });
    },
  });
  return (
    <div className="d-flex mt-5 ms-auto">
      <Button variant="danger m-2" type="submit" onClick={deleteProject}>
        <FaTrash /> Delete Project
      </Button>
    </div>
  );
};

export default DeleteProjectButton;
