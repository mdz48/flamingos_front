import React, { useState, useEffect } from 'react';
import Table from "../components/organisms/Table";
import MenuContainer from "../components/organisms/MenuContainer";
import HorizontalMenu from "../components/molecules/HorizontalMenu";
import Section from '../components/organisms/Form';

function InventarioInsumos() {
  const [insumos, setInsumos] = useState([]);
  const [content, setContent] = useState([]);

  const verticalMenuItems = ['Salones', 'Mobiliario', 'Insumos', 'Renta de Mobiliario'];
  const horizontalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'Costo', 'Creado el', 'Creado por', 'Actualizado el', 'Actualizado por', 'Eliminado'];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/supplies`, {
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

  return (
    <div className="p-8">
      <div className="flex">
        <div className="w-1/3">
          <MenuContainer items={verticalMenuItems} />
        </div>
        <div className="w-2/3 p-8">
          <div className="mb-4">
            <HorizontalMenu items={horizontalMenuItems} />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">Bienvenido a la Administración de Recursos</h1>
            <Table headers={insumos} rows={content} className="mt-8 shadow-md" />
          </div>
        </div>
        <div>
          <Section />
        </div>
      </div>
    </div>
  );
}

export default InventarioInsumos;
