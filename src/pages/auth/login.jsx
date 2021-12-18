import React, { useEffect } from 'react';
import ButtonLoading from 'components/ButtonLoading';
import Input from 'components/Input';
import { LOGIN } from 'graphql/auth/mutation';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const navigate = useNavigate();

  const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
    useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();
    login({ variables: formData });
  };

  // useEffect(() => {
  //   if (dataMutation) {
  //     if (dataMutation.login.error) {
  //       console.error('MOSTRAR MENSAJE DE ERROR AQUI');
  //     }
  //     setToken(dataMutation.login.token);
  //     navigate('/');
  //   }
  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10'>
      <h1 className='text-xl font-bold text-gray-900'>Iniciar sesión</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <Input name='email' type='email' label='Correo' required={true} />
        <Input name='password' type='password' label='Contraseña' required={true} />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Iniciar Sesión'
        />
      </form>
      <span>¿No tienes una cuenta?</span>
      <Link to='/auth/register'>
        <span className='text-blue-700'>Regístrate</span>
      </Link>
    </div>
  );
};

export default Login;
