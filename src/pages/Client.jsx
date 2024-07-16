import React, { useState, useEffect } from 'react';
import Table from "../components/organisms/Table";
import MenuContainer from "../components/organisms/MenuContainer";
import FormClient from '../components/organisms/Forms/client/FormClient';
import SearchForm from '../components/molecules/SearchForm';
import FormEditClient from '../components/organisms/Forms/client/FormEditClient';
import FormDeleteClient from '../components/organisms/Forms/client/FormDeleteClient';
import Navbar from '../components/organisms/Navbar';
import { data } from '../data/data';

function Client() {
  const [insumos, setInsumos] = useState([]);
  const [content, setContent] = useState([]);
  const [showSection, setShowSection] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  const tableHeaders = ['ID', 'Nombre', 'apellido', 'Telefono'];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/client/summaries`, {
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
    setShowSection(false);
    setShowSearch(false);
    setShowDelete(false);
    setSearchResult(null);
    setDeleteResult(null);

    if (item === 'Agregar') {
      setShowSection(true);
    } else if (item === 'Editar') {
      setShowSearch(true);
    } else if (item === 'Borrar') {
      setShowDelete(true);
    }
  };

  const handleSearch = (query) => {
    // Simulación de una búsqueda. Puedes reemplazar esto con una llamada a una API.
    if (query === 'React') {
      setSearchResult('React encontrado!');
    } else {
      setSearchResult('No se encontraron resultados.');
    }
  };
  const handleDelete = (query) => {
    // Simulación de una eliminación. Puedes reemplazar esto con una llamada a una API.
    if (query === 'React') {
      setDeleteResult('React eliminado!');
      // Aquí también puedes actualizar la tabla para reflejar la eliminación
      setContent(content.filter(row => row[1] !== 'React'));
    } else {
      setDeleteResult('No se encontraron resultados para eliminar.');
    }
  };

  return (
    <>
    <Navbar links ={data.navuser}/>
      <div className="flex p-8">
        <div className="w-1/3">
          <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
          {showSection && (
            <div>
              <FormClient />
            </div>
          )}
          {showSearch && (
            <div>
              <SearchForm onSearch={handleSearch} />
              {searchResult && <FormEditClient result={searchResult} />}
            </div>
          )}
          {showDelete && (
            <div>
              <DeleteForm onDelete={handleDelete} />
              {deleteResult && <FormDeleteClient result={deleteResult} />}
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

export default Client;
