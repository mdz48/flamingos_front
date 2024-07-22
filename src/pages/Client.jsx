import React, { useState, useEffect } from 'react';
import Table from '../components/organisms/Table';
import MenuContainer from '../components/organisms/MenuContainer';
import FormClient from '../components/organisms/Forms/client/FormClient';
import FormEditClient from '../components/organisms/Forms/client/FormEditClient';
import FormDeleteClient from '../components/organisms/Forms/client/FormDeleteClient';
import Navbar from '../components/organisms/Navbar';
import { useQuery } from '@tanstack/react-query';
import { data } from '../data/data';

function Client() {
  const [content, setContent] = useState([]);
  const [showSection, setShowSection] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [role, setRole] = useState(null);
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'Apellido', 'Telefono'];

  const { data: clientsData, error, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/client/summaries`, {
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
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('User:', parsedUser);
      setRole(parsedUser.role);
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (clientsData) {
      const headers = Object.keys(clientsData[0] ?? {});
      const rows = clientsData.map((item) => Object.values(item));
      setContent(rows);
    }
  }, [clientsData]);

  const handleMenuClick = (item) => {
    setShowSection(false);
    setShowSearch(false);
    setShowDelete(false);

    if (item === 'Agregar') {
      setShowSection(true);
    } else if (item === 'Editar') {
      setShowSearch(true);
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
      <div className="flex flex-col md:grid md:grid-cols-3 w-[80%] mx-auto">
        {role === 1 && (
          <div className="w-auto md:col-span-1 mb-4 md:mb-0">
            <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
            {showSection && (
              <div>
                <FormClient onClose={() => setShowSection(false)} />
              </div>
            )}
            {showSearch && (
              <div>
                <FormEditClient onClose={() => setShowSearch(false)} />
              </div>
            )}
            {showDelete && (
              <div>
                <FormDeleteClient onClose={() => setShowDelete(false)} />
              </div>
            )}
          </div>
        )}
        <div className={`md:col-span-2 w-full mx-auto overflow-x-auto h-[50vh] ${role !== 1 ? 'md:col-span-3' : ''}`}>
          <Table headers={tableHeaders} rows={content} />
        </div>
      </div>
    </>
  );
}

export default Client;
