import React from 'react';
import { getWeekDays } from '../../utils/CalendarUtils';

function CalendarHeader() {
  const weekDays = getWeekDays();

  return (
    <div className="calendar-header flex">
      {weekDays.map((day, index) => (
        <div key={index} className="day-header flex-1 p-2 text-center font-bold border border-gray-200 bg-slate-400">
          {day}
        </div>
      ))}
    </div>
  );
}

export default CalendarHeader;
