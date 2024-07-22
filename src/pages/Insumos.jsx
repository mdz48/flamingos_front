import React, { useState, useEffect } from "react";
import Table from "../components/organisms/Table";
import MenuContainer from "../components/organisms/MenuContainer";
import { data } from "../data/data";
import Navbar from "../components/organisms/Navbar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FormSupplies from "../components/organisms/Forms/supplies/FormSupplies";
import FormEditSupplies from "../components/organisms/Forms/supplies/FormEditSupplies";
import FormDeleteSupplies from "../components/organisms/Forms/supplies/FormDeleteSupplies";

function Insumos() {
  const [showSection, setShowSection] = useState(false);
  const [formType, setFormType] = useState(null);
  const [role, setRole] = useState(null);
  const verticalMenuItems = ["Agregar", "Editar", "Borrar"];
  const tableHeaders = ["ID", "Nombre", "Costo", "Descripción"];
  const queryClient = useQueryClient();

  const {
    data: insumosData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["supplies"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/supplies/summaries`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const rows = insumosData.map((item) => Object.values(item));

  return (
    <>
      <Navbar links={data.navuser} img = {'/home-empleados'}/>
      <h1 className="text-2xl font-bold mb-4 p-8 text-center">
        Bienvenido a la Administración de Recursos
      </h1>
      <div className="md:grid md:grid-cols-3 w-[80%] mx-auto">
        {role === 1 && (
          <div className="w-auto md:col-span-1">
            <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
            {showSection && (
              <div>
                {formType === "Agregar" && <FormSupplies onClose={() => setShowSection(false)} />}
                {formType === "Editar" && <FormEditSupplies onClose={() => setShowSection(false)} />}
                {formType === "Borrar" && <FormDeleteSupplies onClose={() => setShowSection(false)} />}
              </div>
            )}
          </div>
        )}
        <div className={`md:col-span-2 w-full mx-auto overflow-x-auto h-[50vh] ${role !== 1 ? 'md:col-span-3' : ''}`}>
          <Table headers={tableHeaders} rows={rows} />
        </div>
      </div>
    </>
  );
}

export default Insumos;
