import React, { useState, useEffect } from 'react';
import Table from '../components/organisms/Table';
import MenuContainer from '../components/organisms/MenuContainer';
import FormUsers from '../components/organisms/Forms/user/FormUsers';
import Navbar from '../components/organisms/Navbar';
import { data } from '../data/data';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import FormEditUsers from '../components/organisms/Forms/user/FormEditUsers';
import FormDeleteUsers from '../components/organisms/Forms/user/FormDeleteUsers';
import toast from 'react-hot-toast';

function Users() {
  const [showSection, setShowSection] = useState(false);
  const [formType, setFormType] = useState(null);
  const [role, setRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); 
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'Apellido', 'Rol'];
  const queryClient = useQueryClient();

  const { data: usersData, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/summaries`);
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

  const handleEdit = (user_id) => {
    const user = usersData.find(item => item.user_id === user_id);
    setSelectedUser(user);
    setFormType('Editar');
    setShowSection(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      } else {
        toast.success('Usuario Eliminado');
        queryClient.invalidateQueries('users'); 
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const rows = usersData.map(item => Object.values(item));

  return (
    <>
      <Navbar links={data.navuser} img='/home-empleados' />
      <h1 className="text-2xl font-bold mb-4 p-8 text-center">Bienvenido a la Administración de Usuarios</h1>
      <div className="md:grid md:grid-cols-3 w-[80%] mx-auto">
        {role === 1 && (
          <div className="w-auto md:col-span-1">
            <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
            {showSection && (
              <div>
                {formType === 'Agregar' && <FormUsers onClose={() => setShowSection(false)} />}
                {formType === 'Editar' && selectedUser && <FormEditUsers user={selectedUser} onClose={() => setShowSection(false)} />}
                {formType === 'Borrar' && <FormDeleteUsers onClose={() => setShowSection(false)} />}
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

export default Users;
