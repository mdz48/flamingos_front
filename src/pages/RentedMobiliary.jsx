import React, { useState, useEffect } from 'react';
import Table from "../components/organisms/Table";
import MenuContainer from "../components/organisms/MenuContainer";
import FormRentMobiliary from '../components/organisms/Forms/rentedmobiliary/FormRentMobiliary';
import FormEditRentedMobiliary from '../components/organisms/Forms/rentedmobiliary/FormEditRentedMobiliary';
import FormDeleteRentedMobiliary from '../components/organisms/Forms/rentedmobiliary/FormDeleteRentedMobiliary';
import Navbar from '../components/organisms/Navbar';
import { data } from '../data/data';
import { useQuery } from '@tanstack/react-query';

function RentedMobiliary() {
  const [showSection, setShowSection] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [content, setContent] = useState([]);
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'Descripcion', 'Costo', 'Proveedor', 'Fecha de Entrada', 'Fecha de Salida'];

  const { data: rentedMobiliaryData, error, isLoading } = useQuery({
    queryKey: ['rentedMobiliary'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/rentedMobiliary/summaries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  useEffect(() => {
    if (rentedMobiliaryData) {
      const rows = rentedMobiliaryData.map((item) => Object.values(item));
      setContent(rows);
    }
  }, [rentedMobiliaryData]);

  const handleMenuClick = (item) => {
    setShowSection(false);
    setShowEdit(false);
    setShowDelete(false);

    if (item === 'Agregar') {
      setShowSection(true);
    } else if (item === 'Editar') {
      setShowEdit(true);
    } else if (item === 'Borrar') {
      setShowDelete(true);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  return (
    <>
      <Navbar links={data.navuser} />
      <h1 className="text-2xl font-bold mb-4 p-8 text-center">Bienvenido a la Administración de Recursos</h1>
      <div className="md:grid md:grid-cols-3 w-[80%] mx-auto">
        <div className="w-auto md:col-span-1">
          <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
          {showSection && (
            <div>
              <FormRentMobiliary onClose={() => setShowSection(false)} />
            </div>
          )}
          {showEdit && (
            <div>
              <FormEditRentedMobiliary onClose={() => setShowEdit(false)} />
            </div>
          )}
          {showDelete && (
            <div>
              <FormDeleteRentedMobiliary onClose={() => setShowDelete(false)} />
            </div>
          )}
        </div>
        <div className="md:col-span-2 md:w-auto mx-auto overflow-x-auto h-[50vh]">
          <Table headers={tableHeaders} rows={content} className="shadow-md" />
        </div>
      </div>   
    </>
  );
}

export default RentedMobiliary;
