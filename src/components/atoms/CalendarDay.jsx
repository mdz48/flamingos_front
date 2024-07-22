import React from 'react';

function CalendarDay({ day }) {
  return (
    <div className="calendar-day flex-1 p-4 text-center border border-gray-200 transition-transform transform hover:scale-105">
      {day.date ? (
        <>
          <div>{day.date.getDate()}</div>
          <div>{day.info}</div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default CalendarDay;
