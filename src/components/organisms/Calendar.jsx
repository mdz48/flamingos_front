import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery } from '@tanstack/react-query';
import Button from '../atoms/Button';
import Modal from 'react-modal';
import './Calendar.css';

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root'); // Ajusta esto al ID del elemento raíz de tu aplicación

function MyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {
    data: reservationData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/reservation/summaries`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*'
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Transformar datos de reservaciones
  const events = reservationData.map((item) => ({
    title: `ID: ${item.reservation_id}, Salón: ${item.salon_id_fk}, Cliente: ${item.client_id_fk}, Paquete: ${item.package_type_id_fk}, Invitados: ${item.guest_amount}, Tipo: ${item.event_type}`,
    start: new Date(item.event_date),
    end: new Date(item.event_date),
    ...item, // Añadir todos los datos del evento aquí para acceso en el modal
  }));

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(nextMonth);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePrevMonth} text="Previous" className="mr-2" />
        <div className="text-xl font-bold">{moment(currentDate).format('MMMM YYYY')}</div>
        <Button onClick={handleNextMonth} text="Next" className="ml-2" />
      </div>
      <div className="overflow-x-auto">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          date={currentDate}
          onNavigate={date => setCurrentDate(date)}
          eventPropGetter={() => ({
            style: { whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }
          })}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {/* Modal para mostrar detalles del evento */}
      <Modal
        isOpen={!!selectedEvent}
        onRequestClose={closeModal}
        contentLabel="Detalles del Evento"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedEvent && (
          <div>
            <h2 className="text-2xl mb-4">Detalles del Evento</h2>
            <p><strong>ID:</strong> {selectedEvent.reservation_id}</p>
            <p><strong>Salón:</strong> {selectedEvent.salon_id_fk}</p>
            <p><strong>Cliente:</strong> {selectedEvent.client_id_fk}</p>
            <p><strong>Paquete:</strong> {selectedEvent.package_type_id_fk}</p>
            <p><strong>Invitados:</strong> {selectedEvent.guest_amount}</p>
            <p><strong>Tipo:</strong> {selectedEvent.event_type}</p>
            <Button onClick={closeModal} text="Cerrar" className="mt-4" />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MyCalendar;
