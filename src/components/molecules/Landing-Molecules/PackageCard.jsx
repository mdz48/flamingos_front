import React from 'react';

function PackageCard({ title, price, features }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 max-w-xs md:max-w-sm lg:max-w-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-gray-800 font-semibold mb-4">{price}</p>
      <ul className="list-disc list-inside">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-700 mb-2">{feature}</li>
        ))}
      </ul>
    </div>
  );
}

export default PackageCard;
