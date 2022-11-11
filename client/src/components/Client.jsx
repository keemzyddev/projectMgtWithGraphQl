import { useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./ClientRow";

const Client = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow
                key={client.id}
                id={client.id}
                name={client.name}
                email={client.email}
                phone={client.phone}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Client;
