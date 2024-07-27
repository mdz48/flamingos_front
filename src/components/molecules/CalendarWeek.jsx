import React from 'react';
import CalendarDay from '../atoms/CalendarDay';

function CalendarWeek({ week }) {
  return (
    <div className="calendar-week grid grid-cols-7">
      {week.map((day, index) => (
        <CalendarDay key={index} day={day} />
      ))}
    </div>
  );
}

export default CalendarWeek;
