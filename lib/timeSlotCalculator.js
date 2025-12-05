// Convert time string to minutes (e.g., "09:30" -> 570)
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// Convert minutes to time string (e.g., 570 -> "09:30")
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// Generate 5-minute time slots between start and end times
function generateTimeSlots(startTime, endTime) {
  const slots = [];
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  
  for (let minutes = startMinutes; minutes < endMinutes; minutes += 5) {
    slots.push(minutesToTime(minutes));
  }
  
  return slots;
}

// Calculate available slots by removing booked events
export function calculateAvailableSlots(openingHours, events) {
  if (!openingHours || !openingHours.openTime || !openingHours.closeTime) {
    return [];
  }

  // Generate all possible 5-minute slots
  const allSlots = generateTimeSlots(openingHours.openTime, openingHours.closeTime);
  
  // Convert events to blocked time ranges
  const blockedRanges = events.map(event => {
    // Parse the Brisbane timezone time correctly
    // Events come as "2025-12-05T15:45:00+10:00"
    const startTimeStr = event.startTime.split('T')[1].split('+')[0]; // "15:45:00"
    const endTimeStr = event.endTime.split('T')[1].split('+')[0]; // "16:00:00"
    
    const [startHour, startMin] = startTimeStr.split(':').map(Number);
    const [endHour, endMin] = endTimeStr.split(':').map(Number);
    
    return {
      start: startHour * 60 + startMin,
      end: endHour * 60 + endMin
    };
  });
  
  // Filter out slots that overlap with blocked ranges
  const availableSlots = allSlots.filter(slot => {
    const slotMinutes = timeToMinutes(slot);
    const slotEndMinutes = slotMinutes + 5; // 5-minute slot duration
    
    return !blockedRanges.some(blocked => {
      // Check if slot overlaps with blocked range
      return slotMinutes < blocked.end && slotEndMinutes > blocked.start;
    });
  });
  
  return availableSlots;
}

// Get Brisbane timezone start and end timestamps for a date
export function getBrisbaneTimestamps(date = new Date()) {
  const brisbaneDate = new Date(date.toLocaleString('en-US', { timeZone: 'Australia/Brisbane' }));
  
  const startOfDay = new Date(brisbaneDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(brisbaneDate);
  endOfDay.setHours(23, 59, 59, 999);
  
  return {
    startTime: startOfDay.getTime(),
    endTime: endOfDay.getTime()
  };
}