export function getOpeningHours(openHours, dayOfWeek) {
  const daySchedule = openHours?.find(schedule => 
    schedule.daysOfTheWeek.includes(dayOfWeek)
  );
  
  if (!daySchedule || !daySchedule.hours?.length) {
    return { openHour: null, closeHour: null };
  }
  
  const hours = daySchedule.hours[0];
  return {
    openHour: hours.openHour,
    openMinute: hours.openMinute,
    closeHour: hours.closeHour,
    closeMinute: hours.closeMinute
  };
}