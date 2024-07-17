import React, { useState, useEffect } from 'react';
import Table from "../components/organisms/Table";
import MenuContainer from "../components/organisms/MenuContainer";
import FormMobiliary from '../components/organisms/Forms/mobiliary/FormMobiliary';
import Navbar from '../components/organisms/Navbar';
import { data } from '../data/data';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Mobiliario() {
  const [showSection, setShowSection] = useState(false);
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'Cantidad', 'Estado', 'Disponibles'];
  const queryClient = useQueryClient();

  const { data: mobiliarioData, error, isLoading } = useQuery({
    queryKey: ['mobiliary'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/mobiliary/summaries`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  const handleMenuClick = (item) => {
    if (item === 'Agregar') {
      setShowSection(true);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const rows = mobiliarioData.map(item => Object.values(item));

  return (
    <>
      <Navbar links={data.navuser} />
      <h1 className="text-2xl font-bold mb-4 p-8 text-center">Bienvenido a la Administración de Recursos</h1>
      <div className="md:grid md:grid-cols-3 w-[80%] mx-auto">
        <div className="w-auto md:col-span-1">
          <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
          {showSection && (
            <div>
              <FormMobiliary onClose={() => setShowSection(false)} />
            </div>
          )}
        </div>
        <div className="md:col-span-2 w-full md:w-auto mx-auto overflow-x-auto max-h-[85%]">
          <Table headers={tableHeaders} rows={rows} className="mt-8 shadow-md" />
        </div>
      </div>   
    </>
  );
}

export default Mobiliario;
