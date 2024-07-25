import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Combobox from '../atoms/Combobox';

const ComboboxClient = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [role, setRole] = useState(null);

  const { data: clientData, error, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/client/summaries`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('User:', parsedUser);
      setRole(parsedUser.role);
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  const handleClientChange = (selectedValue) => {
    setSelectedClient(selectedValue);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading client data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      {clientData && (
        <Combobox 
          items={clientData} 
          labelKey="firstname" 
          onChange={handleClientChange} 
        />
      )}
      {selectedClient && (
        <div className="mt-4">
          <p>Selected Client: {selectedClient}</p>
        </div>
      )}
    </div>
  );
};

export default ComboboxClient;
