import React, { useState, useEffect } from 'react';
import Table from "../components/organisms/Table";
import MenuContainer from "../components/organisms/MenuContainer";
import Section from '../components/organisms/Forms/Form';
import FormMobiliary from '../components/organisms/Forms/mobiliary/FormMobiliary';
import Navbar from '../components/organisms/Navbar';
import { data } from '../data/data';


function InventarioMobiliario() {
  const [insumos, setInsumos] = useState([]);
  const [content, setContent] = useState([]);
  const [showSection, setShowSection] = useState(false);

  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar', ];
  const tableHeaders = ['ID', 'Nombre', 'Cantidad', 'Estado', 'Disponibles'];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/mobiliary/summaries`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('No se pudo hacer conexión');
            return [];
        }
    })
    .then(data => {
        if (data.length > 0) {
            const headers = Object.keys(data[0]); //Mapeado de TODOS los atributos EN INGLES //
            const rows = data.map(item => Object.values(item)); // Contenido en sí
            setInsumos(tableHeaders);
            setContent(rows);
        }
    })
    .catch(error => {
        console.log(error);
    });
  }, []);

  const handleMenuClick = (item) => {
    if (item === 'Agregar') {
      setShowSection(true);
    }
  }

  return (
    <>
    <Navbar links={data.navuser} />
    <div className="flex p-8">
      <div className="w-1/3">
        <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
        {showSection && (
          <div>
            <FormMobiliary />
          </div>
        )}
      </div>
      <div className="w-2/3 p-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">Bienvenido a la Administración de Recursos</h1>
          <Table headers={insumos} rows={content} className="mt-8 shadow-md" />
        </div>
       
      </div>
    </div>
    </>
  );
}

export default InventarioMobiliario;
