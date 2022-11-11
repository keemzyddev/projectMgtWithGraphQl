import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const ClientRow = ({ id, name, email, phone }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: id },
    // refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    refetchQueries: [{ query: GET_PROJECTS }],
    update: (cache, { data: { deleteClient } }) => {
      const { clients } = cache.readQuery(
        { query: GET_CLIENTS },
        { query: GET_PROJECTS }
      );
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });

      // cache.modify({
      //     id: cache.identify(id),
      //   fields: {
      //     clients: (existingClientsRef, {readField}) => {
      //       // cache.readFragment({
      //       //   fragment: CLIENT_FRAGMENT
      //       // });

      //       cache.writeFragment({
      //         data: deleteClient,
      //         fragment: CLIENT_FRAGMENT

      //       })
      //       return existingClientsRef.filter(clientRef => clientRef.id !== readField(id, deleteClient))
      // return existingClientsRef.filter((clientRef) => clientRef.id !== deleteClient.id)
      // }
      //   }
      // });
    },
  });
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
