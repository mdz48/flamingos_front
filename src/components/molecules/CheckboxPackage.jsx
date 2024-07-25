

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Combobox from '../atoms/Combobox';

const CheckboxPackage = () => {
  const [selectedPackageType, setSelectedPackageType] = useState(null);
  const [role, setRole] = useState(null);

  const { data: packageTypesData, error, isLoading } = useQuery({
    queryKey: ['packageTypes'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/packageTypes/summaries`);
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

  const handlePackageTypeChange = (selectedValue) => {
    setSelectedPackageType(selectedValue);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading package types data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Package Types</h1>
      {packageTypesData && (
        <Combobox 
          items={packageTypesData} 
          labelKey="name" 
          onChange={handlePackageTypeChange} 
        />
      )}
      {selectedPackageType && (
        <div className="mt-4">
          <p>Selected Package Type: {selectedPackageType}</p>
        </div>
      )}
    </div>
  );
};

export default CheckboxPackage;
