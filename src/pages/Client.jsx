import React, { useState, useEffect } from 'react';
import Table from '../components/organisms/Table';
import MenuContainer from '../components/organisms/MenuContainer';
import FormClient from '../components/organisms/Forms/client/FormClient';
import FormEditClient from '../components/organisms/Forms/client/FormEditClient';
import FormDeleteClient from '../components/organisms/Forms/client/FormDeleteClient';
import Navbar from '../components/organisms/Navbar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { data } from '../data/data';
import toast from 'react-hot-toast';

function Client() {
  const [showSection, setShowSection] = useState(false);
  const [formType, setFormType] = useState(null);
  const [role, setRole] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'Apellido', 'Telefono'];
  const queryClient = useQueryClient();

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
      setRole(parsedUser.role);
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  const handleMenuClick = (item) => {
    setFormType(item);
    setShowSection(true);
  };

  const handleEdit = (client_id) => {
    const client = clientsData.find(item => item.client_id === client_id);
    setSelectedClient(client);
    setFormType("Editar");
    setShowSection(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/client/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Ocurrió un error al eliminar");
      } else {
        toast.success('Cliente Eliminado');
        queryClient.invalidateQueries('clients'); 
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error(`${error}`);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  const rows = clientsData.map((item) => Object.values(item));

  return (
    <>
      <Navbar links={data.navuser} img={'/home-empleados'} />
      <h1 className="text-2xl font-bold mb-4 p-8 text-center">
        Bienvenido a la Administración de Recursos
      </h1>
      <div className="md:grid md:grid-cols-3 w-[80%] mx-auto">
        {role === 1 && (
          <div className="w-auto md:col-span-1">
            <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
            {showSection && (
              <div>
                {formType === "Agregar" && <FormClient onClose={() => setShowSection(false)} />}
                {formType === "Editar" && <FormEditClient client={selectedClient} onClose={() => setShowSection(false)} />}
                {formType === "Borrar" && <FormDeleteClient onClose={() => setShowSection(false)} />}
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

export default Client;
