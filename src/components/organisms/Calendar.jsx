import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CalendarHeader from '../molecules/CalendarHeader';
import CalendarWeek from '../molecules/CalendarWeek';
import { getMonthDays } from '../../utils/CalendarUtils';
import Button from '../atoms/Button';

function Calendar({ year, month }) {
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const {
    data: reservationData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/reservation/summaries`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Transformar y filtrar datos de reservaciones
  const transformedData = transformReservationData(reservationData);
  const filteredEvents = transformedData.filter(
    (item) =>
      item.year === currentYear && item.month === currentMonth
  );

  const days = getMonthDays(currentYear, currentMonth, filteredEvents);
  const weeks = [];
  let week = [];

  days.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % 7 === 0 || index === days.length - 1) {
      weeks.push(week);
      week = [];
    }
  });

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="calendar">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePrevMonth} text="Previous" className="mr-2" />
        <div className="text-xl font-bold">{monthNames[currentMonth]} {currentYear}</div>
        <Button onClick={handleNextMonth} text="Next" className="ml-2" />
      </div>
      <CalendarHeader />
      {weeks.map((week, i) => (
        <CalendarWeek key={i} week={week} />
      ))}
    </div>
  );
}

// Nueva función para transformar los datos
const transformReservationData = (data) => {
  return data.map((item) => {
    const eventDate = new Date(item.event_date);
    return {
      ...item,
      day: eventDate.getUTCDate(),
      month: eventDate.getUTCMonth(),
      year: eventDate.getUTCFullYear(),
    };
  });
};

export default Calendar;
