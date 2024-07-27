import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Combobox from '../atoms/Combobox';

const CheckboxPackage = ({ onChange }) => {
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

  const handlePackageTypeChange = (selectedPackageType) => {
    setSelectedPackageType(selectedPackageType);
    onChange(selectedPackageType); // Pasa el objeto completo
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
    </div>
  );
};

export default CheckboxPackage;
