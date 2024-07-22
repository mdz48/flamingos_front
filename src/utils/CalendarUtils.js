// utils/CalendarUtils.js
export const getMonthDays = (year, month, events) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const eventForDay = events.filter(event => event.day === day);
    return { day, events: eventForDay };
  });

  return days;
};

export function getWeekDays() {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}