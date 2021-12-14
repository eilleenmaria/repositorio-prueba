import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
      _id
      nombre
      apellido
      identificacion
      email
      rol
      estado
    }
  }
`;

const GET_USUARIO = gql`
  query ($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      email
      identificacion
      rol
      estado
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
