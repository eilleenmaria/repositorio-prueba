import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
 query Query($filtro: FiltroUsuarios) {
    Usuarios(filtro: $filtro) {
  # query Usuarios {
  #   Usuarios {
    _id
      nombre
      apellido
      email
      estado
      identificacion
      rol
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
      estado
      identificacion
      rol   
      foto
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
