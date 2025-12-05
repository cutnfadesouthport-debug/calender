import React from 'react';
import { calculateAvailableSlots } from '../lib/timeSlotCalculator';

export default function TimeSlotGrid({ user, schedule, events, selectedHour }) {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = dayNames[new Date().getDay()];
  const todaySchedule = schedule?.find(s => 
    s.rules?.some(rule => rule.day === today)
  );
  const todayRule = todaySchedule?.rules?.find(rule => rule.day === today);
  
  if (!todayRule?.intervals) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#666666',
        background: '#1a1a1a',
        borderRadius: '8px',
        border: '1px solid #333333'
      }}>
        No schedule available for today
      </div>
    );
  }

  // Use first interval as main opening hours
  const interval = todayRule.intervals[0];
  const openingHours = {
    openTime: interval.from,
    closeTime: interval.to
  };

  const availableSlots = calculateAvailableSlots(openingHours, events || []);
  
  // Generate slots for the selected hour
  const hourSlots = [];
  for (let min = 0; min < 60; min += 5) {
    const slotTime = `${selectedHour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    hourSlots.push(slotTime);
  }

  return (
    <div style={{
      background: '#1a1a1a',
      border: '1px solid #333333',
      borderRadius: '8px',
      padding: '15px'
    }}>
      <h4 style={{ 
        color: '#10b981', 
        marginBottom: '15px',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        {user.name} - {selectedHour}:00 - {selectedHour + 1}:00
      </h4>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px'
      }}>
        {hourSlots.map(slot => {
          const isAvailable = availableSlots.includes(slot);
          return (
            <div
              key={slot}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '500',
                background: isAvailable ? '#10b981' : '#ef4444',
                color: '#ffffff',
                border: `1px solid ${isAvailable ? '#059669' : '#dc2626'}`
              }}
            >
              {slot}
            </div>
          );
        })}
      </div>
      
      <div style={{
        marginTop: '15px',
        padding: '10px',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid #10b981',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#94a3b8'
      }}>
        Available: {availableSlots.filter(slot => slot.startsWith(selectedHour.toString().padStart(2, '0'))).length} / {hourSlots.length} slots
      </div>
    </div>
  );
}