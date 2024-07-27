import React, { useState, useEffect } from 'react';
import Table from '../components/organisms/Table';
import MenuContainer from '../components/organisms/MenuContainer';
import FormRentMobiliary from '../components/organisms/Forms/rentedmobiliary/FormRentMobiliary';
import FormEditRentedMobiliary from '../components/organisms/Forms/rentedmobiliary/FormEditRentedMobiliary';
import FormDeleteRentedMobiliary from '../components/organisms/Forms/rentedmobiliary/FormDeleteRentedMobiliary';
import Navbar from '../components/organisms/Navbar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { data } from '../data/data';
import toast from 'react-hot-toast';

function RentedMobiliary() {
  const [showSection, setShowSection] = useState(false);
  const [formType, setFormType] = useState(null);
  const [selectedMobiliary, setSelectedMobiliary] = useState(null);
  const [role, setRole] = useState(null);
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'Descripción', 'Costo', 'Proveedor', 'Fecha de Entrada', 'Fecha de Salida'];
  const queryClient = useQueryClient();

  const { data: rentedMobiliaryData, error, isLoading } = useQuery({
    queryKey: ['rentedMobiliary'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/rentedMobiliary/summaries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*'
        },
      });
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

  const handleEdit = (rented_mobiliary_id) => {
    const mobiliary = rentedMobiliaryData.find(item => item.rented_mobiliary_id === rented_mobiliary_id);
    setSelectedMobiliary(mobiliary);
    setFormType('Editar');
    setShowSection(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/rentedMobiliary/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*'
        },
      });
      if (!response.ok) {
        throw new Error("Ocurrió un error al eliminar");
      } else {
        toast.success('Mobiliario Eliminado')
        queryClient.invalidateQueries('rentedMobiliary'); 
      }
    } catch (error) {
      toast.error(`${error}`)
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  const rows = rentedMobiliaryData.map(item => Object.values(item));

  return (
    <>
      <Navbar links={data.navuser} img='/home-empleados' />
      <h1 className="text-2xl font-bold mb-4 p-8 text-center">Bienvenido a la Administración de Recursos</h1>
      <div className="md:grid md:grid-cols-3 w-[80%] mx-auto">
        {role === 1 && (
          <div className="w-auto md:col-span-1">
            <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
            {showSection && (
              <div>
                {formType === 'Agregar' && <FormRentMobiliary onClose={() => setShowSection(false)} />}
                {formType === 'Editar' && <FormEditRentedMobiliary rentedMobiliary={selectedMobiliary} onClose={() => setShowSection(false)} />}
                {formType === 'Borrar' && <FormDeleteRentedMobiliary onClose={() => setShowSection(false)} />}
              </div>
            )}
          </div>
        )}
        <div className={`md:col-span-2 w-full md:w-auto mx-auto overflow-x-auto h-[50vh] ${role !== 1 ? 'md:col-span-3' : ''}`}>
          <Table headers={tableHeaders} rows={rows} className="shadow-md" onEdit={handleEdit} onDelete={handleDelete} role={role} />
        </div>
      </div>
    </>
  );
}

export default RentedMobiliary;
