import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;
export const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
    name
    email
    phone
  }
`;
