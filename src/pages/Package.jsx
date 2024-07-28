import React, { useState, useEffect } from 'react';
import Table from "../components/organisms/Table";
import MenuContainer from "../components/organisms/MenuContainer";
import FormSalon from '../components/organisms/Forms/salon/FormSalon';
import FormPackage from '../components/organisms/Forms/package/FormPackage';
import FormEditPackage from '../components/organisms/Forms/package/FormEditPackage';
import FormDeletePackage from '../components/organisms/Forms/package/FormDeletePackage';
import FormEditSalon from '../components/organisms/Forms/salon/FormEditSalon';
import FormDeleteSalon from '../components/organisms/Forms/salon/FormDeleteSalon';
import Navbar from '../components/organisms/Navbar';
import { data } from '../data/data';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';

function PackageTypes() {
  const [showSection, setShowSection] = useState(false);
  const [formType, setFormType] = useState(null);
  const [role, setRole] = useState(null);
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'Precio', 'Descripcion'];
  const [selectedPackageType, setSelectedPackageType] = useState(null); 
  const queryClient = useQueryClient();
  const value = useContext(UserContext);
  if (!value.user.firstname) {
    return <Navigate to='/login'/>
  }

  const { data: packageTypeData, error, isLoading } = useQuery({
    queryKey: ['packageTypes'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/packageTypes/summaries`, {
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

  const handleEdit = (packageType_id) => {
    const packageType = packageTypeData.find(item => item.packageType_id === packageType_id);
    setSelectedPackageType(packageType);
    setFormType("Editar");
    setShowSection(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/packageTypes/${id}`, {
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
        toast.success('Package Type Eliminado')
        queryClient.invalidateQueries('packageTypes'); 
      }
    } catch (error) {
      toast.error(`${error}`)
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const rows = packageTypeData.map(item => Object.values(item));

  return (
    <>
      <Navbar links={data.navuser} img={'/home-empleados'} />
      <h1 className="text-2xl font-bold mb-4 p-8 text-center">Bienvenido a la Administración de Tipos de Paquete</h1>
      <div className="md:grid md:grid-cols-3 w-[80%] mx-auto">
        {role === 1 && (
          <div className="w-auto md:col-span-1">
            <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
            {showSection && (
              <div>
                {formType === 'Agregar' && <FormPackage onClose={() => setShowSection(false)} />}
                {formType === 'Editar' && <FormEditPackage packageType={selectedPackageType} onClose={() => setShowSection(false)} />}
                {formType === 'Borrar' && <FormDeletePackage onClose={() => setShowSection(false)} />}
              </div>
            )}
          </div>
        )}
        <div className={`md:col-span-2 w-full md:w-auto mx-auto overflow-x-auto h-[50vh] ${role !== 1 ? 'md:col-span-3' : ''}`}>
          <Table headers={tableHeaders} rows={rows} className="shadow-md" onDelete={handleDelete} onEdit={handleEdit} role={role}/>
        </div>
      </div>
    </>
  );
}

export default PackageTypes;
