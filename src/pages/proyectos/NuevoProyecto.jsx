import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from 'components/Input';
import { GET_USUARIOS } from 'graphql/usuario/queries';
import { Link } from 'react-router-dom';
import DropDown from 'components/DropDown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Enum_TipoObjetivo } from 'utils/enums';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';


const NuevoProyecto = () => {
  const { form, formData, updateFormData } = useFormData();
  const [listaUsuarios, setListaUsuarios] = useState({});

  // falta captura del error del query
  const { data, loading } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: 'LIDER', estado: 'AUTORIZADO' },
    },
  });

  // falta mensaje de success
  // falta captura del error de la mutacion y revisar si se debe agregar el loading
  const [crearProyecto] = useMutation(CREAR_PROYECTO);

  useEffect(() => {
    if (data) {
      const lu = {};
      data.Usuarios.forEach((elemento) => {
        lu[elemento._id] = elemento.email;
      });

      setListaUsuarios(lu);
    }
  }, [data]);

  const submitForm = (e) => {
    e.preventDefault();

    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);

    crearProyecto({
      variables: formData,
    });
  };

  if (loading) return <div>...Loading</div>;

  return (
    <div className='p-10 flex flex-col items-center'>
      <div className='self-start'>
        <Link to='/proyectos'>
          <i className='fas fa-arrow-left' />
        </Link>
      </div>
      <h1 className='text-2xl font-bold text-gray-900'>Crear Nuevo Proyecto</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input name='nombre' label='Nombre del Proyecto' required type='text' />
        <Input
          name='presupuesto'
          label='Presupuesto del Proyecto'
          required
          type='number'
        />
        <Input
          name='fechaInicio'
          label='Fecha de Inicio'
          required
          type='date'
        />
        <Input name='fechaFin' label='Fecha de Fin' required type='date' />
        <DropDown label='Líder' options={listaUsuarios} name='lider' required />
        <Objetivos />
        <ButtonLoading text='Crear Proyecto' loading={false} disabled={false} />
      </form>
    </div>
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 4) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Objetivos del Proyecto</span>
        {!maxObjetivos && (
          <button
            type='button'
            onClick={() =>
              setListaObjetivos([
                ...listaObjetivos,
                componenteObjetivoAgregado(),
              ])
            }
          >
            <i className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer' />
          </button>
        )}
        {listaObjetivos.map((objetivo) => objetivo)}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className='flex items-center'>
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label='Descripción'
        type='text'
        required
      />
      <DropDown
        name={`nested||objetivos||${id}||tipo`}
        options={Enum_TipoObjetivo}
        label='Tipo de Objetivo'
        required
      />
      <button type='button' onClick={() => eliminarObjetivo(id)}>
        <i className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6' />
      </button>
    </div>
  );
};

export default NuevoProyecto;
// const NuevoProyecto = () => {
//   const { form, formData, updateFormData } = useFormData();
//   const [listaUsuarios, setListaUsuarios] = useState({});
//   const { data, loading, error } = useQuery(GET_USUARIOS, {
//     variables: {
//       filtro: { rol: 'LIDER', estado: 'AUTORIZADO' },
//     },
//   });

//   const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
//     useMutation(CREAR_PROYECTO);

//   useEffect(() => {
//     console.log(data);
//     if (data) {
//       const lu = {};
//       data.Usuarios.forEach((elemento) => {
//         lu[elemento._id] = elemento.email;
//       });

//       setListaUsuarios(lu);
//     }
//   }, [data]);

//   useEffect(() => {
//     console.log('data mutation', mutationData);
//   });

//   const submitForm = (e) => {
//     e.preventDefault();

//     formData.objetivos = Object.values(formData.objetivos);
//     formData.presupuesto = parseFloat(formData.presupuesto);

//     crearProyecto({
//       variables: formData,
//     });
//   };

//   if (loading) return <div>...Loading</div>;

//   return (
//     <div className='p-10 flex flex-col items-center'>
//       <div className='self-start'>
//         <Link to='/proyectos'>
//           <i className='fas fa-arrow-left' />
//         </Link>
//       </div>
//       <h1 className='text-2xl font-bold text-gray-900'>Crear Nuevo Proyecto</h1>
//       <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
//         <Input name='nombre' label='Nombre del Proyecto' required={true} type='text' />
//         <Input name='presupuesto' label='Presupuesto del Proyecto' required={true} type='number' />
//         <Input name='fechaInicio' label='Fecha de Inicio' required={true} type='date' />
//         <Input name='fechaFin' label='Fecha de Fin' required={true} type='date' />
//         <DropDown label='Líder' options={listaUsuarios} name='lider' required={true} />
//         <Objetivos />
//         <ButtonLoading text='Crear Proyecto' loading={false} disabled={false} />
//       </form>
//     </div>
//   );
// };

// const Objetivos = () => {
//   const [listaObjetivos, setListaObjetivos] = useState([]);
//   const [maxObjetivos, setMaxObjetivos] = useState(false);

//   const eliminarObjetivo = (id) => {
//     setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
//   };

//   const componenteObjetivoAgregado = () => {
//     const id = nanoid();
//     return <FormObjetivo key={id} id={id} />;
//   };

//   useEffect(() => {
//     if (listaObjetivos.length > 4) {
//       setMaxObjetivos(true);
//     } else {
//       setMaxObjetivos(false);
//     }
//   }, [listaObjetivos]);

//   return (
//     <ObjContext.Provider value={{ eliminarObjetivo }}>
//       <div>
//         <span>Objetivos del Proyecto</span>
//         {!maxObjetivos && (
//           <i
//             onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}
//             className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
//           />
//         )}
//         {listaObjetivos.map((objetivo) => {
//           return objetivo;
//         })}
//       </div>
//     </ObjContext.Provider>
//   );
// };

// const FormObjetivo = ({ id }) => {
//   const { eliminarObjetivo } = useObj();
//   return (
//     <div className='flex items-center'>
//       <Input
//         name={`nested||objetivos||${id}||descripcion`}
//         label='Descripción'
//         type='text'
//         required={true}
//       />
//       <DropDown
//         name={`nested||objetivos||${id}||tipo`}
//         options={Enum_TipoObjetivo}
//         label='Tipo de Objetivo'
//         required={true}
//       />
//       <i
//         onClick={() => eliminarObjetivo(id)}
//         className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6'
//       />
//     </div>
//   );
// };

// export default NuevoProyecto;
