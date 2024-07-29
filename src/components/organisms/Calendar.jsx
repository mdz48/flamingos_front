import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from '../atoms/Button';
import Modal from 'react-modal';
import './Calendar.css';

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root');

function MyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [salons, setSalons] = useState([]);
  const [clients, setClients] = useState([]);
  const [packages, setPackages] = useState([]);
  const [detailsFetched, setDetailsFetched] = useState(false);

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

  useEffect(() => {
    const fetchDetails = async () => {
      const fetchData = async (url) => {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*'
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      };

      const [salonsData, clientsData, packagesData] = await Promise.all([
        fetchData(`${import.meta.env.VITE_URL}/salon`),
        fetchData(`${import.meta.env.VITE_URL}/client`),
        fetchData(`${import.meta.env.VITE_URL}/packagetypes`),
      ]);

      setSalons(salonsData);
      setClients(clientsData);
      setPackages(packagesData);
      setDetailsFetched(true);
    };

    fetchDetails();
  }, []);

  if (isLoading || !detailsFetched) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const events = reservationData.map((item) => {
    const eventDate = moment(item.event_date).startOf('day').toDate();
    return {
      title: `ID: ${item.reservation_id}, Salón: ${salons.find(salon => salon.salon_id === item.salon_id_fk)?.name || 'Desconocido'}, Cliente: ${clients.find(client => client.client_id === item.client_id_fk)?.firstname || 'Desconocido'}, Paquete: ${packages.find(pkg => pkg.package_type_id === item.package_type_id_fk)?.name || 'Desconocido'}, Invitados: ${item.guest_amount}, Tipo: ${item.event_type}`,
      start: eventDate,
      end: eventDate,
      ...item,
      salon: salons.find(salon => salon.salon_id === item.salon_id_fk) || {},
      client: clients.find(client => client.client_id === item.client_id_fk) || {},
      package_type: packages.find(pkg => pkg.package_type_id === item.package_type_id_fk) || {},
    };
  });

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="md:p-8">
      <div className="overflow-x-auto">
        <Calendar
          messages={{
            allDay: "Todo el día",
            previous: "Anterior",
            next: "Siguiente",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "Sin eventos"
          }}
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
            <p><strong>Salón:</strong> {selectedEvent.salon.name}</p>
            <p><strong>Cliente:</strong> {selectedEvent.client.firstname}</p>
            <p><strong>Paquete:</strong> {selectedEvent.package_type.name}</p>
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
