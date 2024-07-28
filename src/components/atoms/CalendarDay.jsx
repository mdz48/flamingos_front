import React from 'react';

function CalendarDay({ day }) {
  return (
    <div className="calendar-day p-2 border border-gray-200">
      <div className="text-center font-bold">{day.day}</div>
      {day.events.map((event, index) => (
        <div key={index} className="text-xs text-gray-600 mt-1">
          <div>Reservation ID: {event.reservation_id}</div>
          <div>Salon: {event.salon.name}</div>
          <div>Client: {event.client.firstname}</div>
          <div>Paquete: {event.package_type.name}</div>
          <div>Numero de invitados: {event.guest_amount}</div>
          <div>Tipo de Evento: {event.event_type}</div>
        </div>
      ))}
    </div>
  );
}

export default CalendarDay;
