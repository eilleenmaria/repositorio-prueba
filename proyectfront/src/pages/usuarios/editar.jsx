import React, { useEffect, useState } from 'react';
import { GET_USUARIO } from 'graphql/usuario/queries';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import DropDown from 'components/DropDown';
import { EDITAR_USUARIO } from 'graphql/usuario/mutations';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import {  Enum_EstadoUsuario } from 'utils/enums';

const EditarUsuario = () => {
  // const [userData, setUserData] = useState({});
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const {
    // loading: loadingQuery,
    // error: errorQuery,
    // data: dataQuery,
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  // const submitForm = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   await editUser({
  //     variables: { _id, ...formData },
  //   });
  // };
  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  // useEffect(() => {
  //   if (dataMutation) {
  //     toast.success('Usuario modificado con exito');
  //     setUserData(dataMutation.editUser);
  //   }
  //   if (dataQuery) {
  //     console.log('dq', dataQuery);
  //     setUserData(dataQuery.Usuario);
  //   }
  // }, [dataMutation, dataQuery]);

  // useEffect(() => {
  //   if (errorMutation) {
  //     toast.error('Error modificando el usuario');
  //   }
  // }, [errorMutation]);

  // if (loadingQuery) return <div>Loading</div>;
  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre de la persona:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required={true}
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required={true}
        />
        <Input
          label='Correo de la persona:'
          type='email'
          name='email'
          defaultValue={queryData.Usuario.email}
          required={true}
        />
        <Input
          label='Identificación de la persona:'
          type='text'
          name='identificacion'
          defaultValue={queryData.Usuario.identificacion}
          required={true}
        />
        <DropDown
          label='Estado de la persona:'
          name='estado'
          defaultValue={queryData.Usuario.estado}
          required={true}
          options={Enum_EstadoUsuario}
        />
        <span>Rol del usuario: {queryData.Usuario.rol}</span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};

export default EditarUsuario;
