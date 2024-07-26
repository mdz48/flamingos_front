import React, { useState, useEffect } from 'react';
import Table from "../components/organisms/Table";
import MenuContainer from "../components/organisms/MenuContainer";
import FormSalon from '../components/organisms/Forms/salon/FormSalon';
import FormEditSalon from '../components/organisms/Forms/salon/FormEditSalon';
import FormDeleteSalon from '../components/organisms/Forms/salon/FormDeleteSalon';
import Navbar from '../components/organisms/Navbar';
import { data } from '../data/data';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function Salon() {
  const [showSection, setShowSection] = useState(false);
  const [formType, setFormType] = useState(null);
  const [role, setRole] = useState(null);
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'Capacidad', 'Descripción'];
  const [selectedSalon, setSelectedSalon] = useState(null); 
  const queryClient = useQueryClient();

  const { data: salonData, error, isLoading } = useQuery({
    queryKey: ['salon'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/salon/summaries`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role);
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  const handleMenuClick = (item) => {
    setFormType(item);
    setShowSection(true);
  };

  const handleEdit = (salon_id) => {
    const salon = salonData.find(item => item.salon_id === salon_id);
    setSelectedSalon(salon);
    setFormType("Editar");
    setShowSection(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/salon/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Ocurrió un error al eliminar");
      } else {
        toast.success('Salon Eliminado')
        queryClient.invalidateQueries('salon'); 
      }
    } catch (error) {
      toast.error(`${error}`)
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const rows = salonData.map(item => Object.values(item));

  return (
    <>
      <Navbar links={data.navuser} img={'/home-empleados'} />
      <h1 className="text-2xl font-bold mb-4 p-8 text-center">Bienvenido a la Administración de Recursos</h1>
      <div className="md:grid md:grid-cols-3 w-[80%] mx-auto">
        {role === 1 && (
          <div className="w-auto md:col-span-1">
            <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
            {showSection && (
              <div>
                {formType === 'Agregar' && <FormSalon onClose={() => setShowSection(false)} />}
                {formType === 'Editar' && <FormEditSalon salon={selectedSalon} onClose={() => setShowSection(false)} />}
                {formType === 'Borrar' && <FormDeleteSalon onClose={() => setShowSection(false)} />}
              </div>
            )}
          </div>
        )}
        <div className={`md:col-span-2 w-full md:w-auto mx-auto overflow-x-auto h-[50vh] ${role !== 1 ? 'md:col-span-3' : ''}`}>
          <Table headers={tableHeaders} rows={rows} className="shadow-md" onDelete={handleDelete} onEdit={handleEdit}/>
        </div>
      </div>
    </>
  );
}

export default Salon;
