import { gql } from '@apollo/client';

const REGISTRO = gql`
  mutation Registro(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $email: String!
    $rol: Enum_Rol!
    $password: String!
  ) {
    registro(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      email: $email
      rol: $rol
      password: $password
    ) {
      token
      error
      

    }
  }
`;

const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      error
    
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    
    }
  }
`;

export { REGISTRO, LOGIN, REFRESH_TOKEN };
