export function getMonthDays(year, month, events) {
    const date = new Date(year, month, 1);
    const days = [];
  
    // Fill initial empty days
    for (let i = 0; i < date.getDay(); i++) {
      days.push({ date: null, info: null });
    }
  
    // Fill the days of the month
    while (date.getMonth() === month) {
      const dayInfo = events[date.getDate()] || null;
      days.push({ date: new Date(date), info: dayInfo });
      date.setDate(date.getDate() + 1);
    }
  
    // Fill remaining empty days to complete the last week
    while (days.length % 7 !== 0) {
      days.push({ date: null, info: null });
    }
  
    return days;
  }
  
  export function getWeekDays() {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
