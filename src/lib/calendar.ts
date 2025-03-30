import { addDays, isWithinInterval, parseISO, isBefore, isAfter, isSameDay, format, startOfDay, endOfDay } from 'date-fns';

interface Booking {
  start: Date;
  end: Date;
}

export async function fetchBookings(): Promise<Booking[]> {
  try {
    // In production, this would be your hosted ICS file
    console.log('Fetching bookings from ICS file...');
    const baseUrl = import.meta.env.BASE_URL || '';
    const response = await fetch(`${baseUrl}bookings.ics`, {
      method: 'GET',
      headers: {
        'Accept': 'text/calendar',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch ICS file:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        baseUrl
      });
      return [];
    }
    
    const text = await response.text();
    console.log('ICS file content:', text);
    
    if (!text.includes('BEGIN:VCALENDAR')) {
      console.error('Invalid ICS file format');
      return [];
    }
    
    const bookings = parseICS(text);
    console.log('Parsed bookings:', bookings.map(b => ({
      start: format(b.start, 'yyyy-MM-dd'),
      end: format(b.end, 'yyyy-MM-dd')
    })));
    
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

function parseICS(icsContent: string): Booking[] {
  const bookings: Booking[] = [];
  const lines = icsContent.split('\n');
  let currentBooking: Partial<Booking> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('BEGIN:VEVENT')) {
      currentBooking = {};
    } else if (line.startsWith('END:VEVENT')) {
      if (currentBooking.start && currentBooking.end) {
        bookings.push({
          start: startOfDay(currentBooking.start),
          end: endOfDay(currentBooking.end),
        });
      }
    } else if (line.startsWith('DTSTART')) {
      const dateStr = line.split(':')[1];
      // Parse the date string in format YYYYMMDDTHHMMSS
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const date = new Date(`${year}-${month}-${day}`);
      console.log('Parsed start date:', {
        original: dateStr,
        parsed: format(date, 'yyyy-MM-dd')
      });
      currentBooking.start = date;
    } else if (line.startsWith('DTEND')) {
      const dateStr = line.split(':')[1];
      // Parse the date string in format YYYYMMDDTHHMMSS
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const date = new Date(`${year}-${month}-${day}`);
      console.log('Parsed end date:', {
        original: dateStr,
        parsed: format(date, 'yyyy-MM-dd')
      });
      currentBooking.end = date;
    }
  }

  return bookings;
}

export function isDateAvailable(date: Date, bookings: Booking[]): boolean {
  const normalizedDate = startOfDay(date);
  
  // Check if the date falls within any booking period
  return !bookings.some(booking => {
    const isBooked = isWithinInterval(normalizedDate, { 
      start: booking.start, 
      end: booking.end 
    });
    
    console.log('Checking date availability:', {
      date: format(normalizedDate, 'yyyy-MM-dd'),
      bookingStart: format(booking.start, 'yyyy-MM-dd'),
      bookingEnd: format(booking.end, 'yyyy-MM-dd'),
      isBooked
    });
    
    return isBooked;
  });
}

export function isPeriodAvailable(start: Date, end: Date, bookings: Booking[]): boolean {
  const normalizedStart = startOfDay(start);
  const normalizedEnd = endOfDay(end);
  
  console.log('Checking period availability:');
  console.log('Requested period:', {
    start: format(normalizedStart, 'yyyy-MM-dd'),
    end: format(normalizedEnd, 'yyyy-MM-dd')
  });
  console.log('Existing bookings:', bookings.map(b => ({
    start: format(b.start, 'yyyy-MM-dd'),
    end: format(b.end, 'yyyy-MM-dd')
  })));

  // Check if any part of the period overlaps with any booking
  const hasOverlap = bookings.some(booking => {
    // Check if the requested period overlaps with any booking period
    const startOverlaps = isWithinInterval(normalizedStart, { start: booking.start, end: booking.end });
    const endOverlaps = isWithinInterval(normalizedEnd, { start: booking.start, end: booking.end });
    const containsBooking = isBefore(normalizedStart, booking.start) && isAfter(normalizedEnd, booking.end);

    console.log('Checking against booking:', {
      bookedStart: format(booking.start, 'yyyy-MM-dd'),
      bookedEnd: format(booking.end, 'yyyy-MM-dd'),
      startOverlaps,
      endOverlaps,
      containsBooking
    });

    return startOverlaps || endOverlaps || containsBooking;
  });

  console.log('Has overlap:', hasOverlap);
  return !hasOverlap;
}

export function getNextAvailableDate(date: Date, bookings: Booking[]): Date {
  let nextDate = addDays(date, 1);
  while (!isDateAvailable(nextDate, bookings)) {
    nextDate = addDays(nextDate, 1);
  }
  return nextDate;
} 