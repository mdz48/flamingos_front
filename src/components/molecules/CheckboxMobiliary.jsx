// src/pages/MobiliarioPage.jsx

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Checkbox from '../atoms/Checkbox';

const CheckboxMobiliary = () => {
  const [role, setRole] = useState(null);

  const { data: mobiliarioData, error, isLoading } = useQuery({
    queryKey: ['mobiliary'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/mobiliary/summaries`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*'
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('User:', parsedUser);
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading mobiliario data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mobiliario</h1>
      {mobiliarioData && <Checkbox items={mobiliarioData} />}
    </div>
  );
};

export default CheckboxMobiliary;
