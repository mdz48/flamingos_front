import React from 'react';

function CalendarDay({ day }) {
  return (
    <div className="calendar-day p-2 border border-gray-200">
      <div className="text-center font-bold">{day.day}</div>
      {day.events.map((event, index) => (
        <div key={index} className="text-xs text-gray-600 mt-1">
          <div>ID: {event.reservation_id} </div>
          <div>Salón: {event.salon_id_fk}</div>
          <div>Cliente: {event.client_id_fk}</div>
          <div>Paquete: {event.package_type_id_fk}</div>
          <div>Invitados: {event.guest_amount}</div>
          <div>Tipo: {event.event_type}</div>
        </div>
      ))}
    </div>
  );
}

export default CalendarDay;
