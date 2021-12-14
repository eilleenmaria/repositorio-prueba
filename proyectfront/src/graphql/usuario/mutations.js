import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $email: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      email: $email
      estado: $estado
    ) {
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

const EDITAR_PERFIL = gql`
  mutation EditarPerfil($_id: String!, $campos: CamposEditarPerfil!) {
    editarPerfil(_id: $_id, campos: $campos) {
      _id
      nombre
      apellido
      identificacion
      foto
    }
  }
`;

export { EDITAR_USUARIO, EDITAR_PERFIL };
