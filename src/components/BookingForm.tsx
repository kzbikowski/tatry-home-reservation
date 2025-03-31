import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format, isBefore, isAfter, isSameDay, addDays } from "date-fns";
import { enUS, pl, de } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from '@/lib/i18n';
import { fetchBookings, isDateAvailable, isPeriodAvailable } from '@/lib/calendar';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const BookingForm = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [bookings, setBookings] = useState<Array<{ start: Date; end: Date }>>([]);
  const { t, language } = useLanguage();
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  
  // Calculate tomorrow's date for earliest booking
  const tomorrow = addDays(new Date(), 1);
  
  const getLocale = () => {
    switch(language) {
      case 'pl': return pl;
      case 'de': return de;
      default: return enUS;
    }
  };
  
  useEffect(() => {
    const loadBookings = async () => {
      console.log('Loading bookings in BookingForm...');
      const fetchedBookings = await fetchBookings();
      console.log('Fetched bookings in BookingForm:', fetchedBookings.map(b => ({
        start: format(b.start, 'yyyy-MM-dd'),
        end: format(b.end, 'yyyy-MM-dd')
      })));
      setBookings(fetchedBookings);
    };
    loadBookings();
  }, []);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    if (!range) return;
    
    console.log('Start: Date range selected:', {
      from: range.from ? format(range.from, 'yyyy-MM-dd') : 'undefined',
      to: range.to ? format(range.to, 'yyyy-MM-dd') : 'undefined', 
      checkIn: checkIn ? format(checkIn, 'yyyy-MM-dd') : 'undefined',
      checkOut: checkOut ? format(checkOut, 'yyyy-MM-dd') : 'undefined'
    });

    // If we have a complete range selected, treat any click as a new start date
    if (checkIn && checkOut) {
      // Clear current range and start a new selection with the clicked date
      const newStartDate = range.from !== checkIn ? range.from : range.to;
      setCheckIn(newStartDate);
     
      setCheckOut(undefined);
      return;
    }

    // If we only have start date selected
    if (checkIn) {
      if (range.to && isBefore(range.to, checkIn)) {
        // If clicked date is before start date, clear everything
        setCheckIn(undefined);
        setCheckOut(undefined);
        return;
      }

      // Check if the entire period is available
      if (range.to && !isPeriodAvailable(checkIn, range.to, bookings)) {
        toast.error(t('booking.error.dates_unavailable'), {
          position: 'bottom-center',
          duration: 3000,
          className: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg text-base',
          style: {
            marginBottom: '1rem',
            zIndex: 50
          }
        });
        setCheckIn(undefined);
        setCheckOut(undefined);
        return;
      }

      // Set the end date
      setCheckOut(range.to);
      return;
    }

    // First click - setting start date
    if (range.from) {
      setCheckIn(range.from);
      setCheckOut(undefined);
    }
  };

  const isDateDisabled = (date: Date) => {
    // First check if the date is before tomorrow (disallow past dates)
    if (isBefore(date, tomorrow)) {
      return true;
    }
    
    // Then check availability from bookings
    const isDisabled = !isDateAvailable(date, bookings);
    return isDisabled;
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!checkIn || !checkOut) {
      toast.error(t('booking.error.dates'), {
        position: 'bottom-center',
        duration: 3000,
        className: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg text-base',
        style: {
          marginBottom: '1rem',
          zIndex: 50
        }
      });
      return;
    }

    // Check if the selected dates are available
    const isAvailable = isDateAvailable(checkIn, bookings) && isDateAvailable(checkOut, bookings);
    if (!isAvailable) {
      toast.error(t('booking.error.dates_unavailable'), {
        position: 'bottom-center',
        duration: 3000,
        className: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg text-base',
        style: {
          marginBottom: '1rem',
          zIndex: 50
        }
      });
      return;
    }

    try {
      // Format dates in the user's local language
      const formattedCheckIn = format(checkIn, "PPP", { locale: getLocale() });
      const formattedCheckOut = format(checkOut, "PPP", { locale: getLocale() });

      // Create email content
      const emailHtml = `
        <h2>${t('booking.email.newBooking')}</h2>
        <p><strong>${t('booking.email.checkIn')}:</strong> ${formattedCheckIn}</p>
        <p><strong>${t('booking.email.checkOut')}:</strong> ${formattedCheckOut}</p>
        <p><strong>${t('booking.email.name')}:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>${t('booking.email.email')}:</strong> ${data.email}</p>
        <p><strong>${t('booking.email.phone')}:</strong> ${data.phone}</p>
      `;

      // For GitHub Pages deployment, we'll use a direct API call to a third-party service
      // that can handle the email sending without a backend
      
      // Create an email using mailto link as fallback for GitHub Pages
      const subject = encodeURIComponent(t('booking.email.subject'));
      const body = encodeURIComponent(
        `${t('booking.email.newBooking')}\n\n` +
        `${t('booking.email.checkIn')}: ${formattedCheckIn}\n` +
        `${t('booking.email.checkOut')}: ${formattedCheckOut}\n` +
        `${t('booking.email.name')}: ${data.firstName} ${data.lastName}\n` +
        `${t('booking.email.email')}: ${data.email}\n` +
        `${t('booking.email.phone')}: ${data.phone}`
      );
      
      // If we're on GitHub Pages deployment (or any environment that doesn't support API endpoints)
      const isGitHubPages = window.location.hostname.includes('github.io') || 
                          import.meta.env.MODE === 'production';
      
      if (isGitHubPages) {
        // Option 1: Open a mailto link (for GitHub Pages)
        window.open(`mailto:tatryhomepl@gmail.com?subject=${subject}&body=${body}`);
        
        // Show success message after mailto
        toast.success(t('booking.success'), {
          position: 'bottom-center',
          duration: 3000,
          className: 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg text-base',
          style: {
            marginBottom: '1rem',
            zIndex: 50
          }
        });
        reset();
        setCheckIn(undefined);
        setCheckOut(undefined);
        return;
      }
      
      // If not on GitHub Pages, continue with the API approach
      const apiUrl = import.meta.env.DEV 
        ? '/api/resend/emails'
        : 'https://api.resend.com/emails';

      console.log('Submitting form to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Tatry Home <onboarding@resend.dev>',
          to: ['tatryhomepl@gmail.com'],
          subject: t('booking.email.subject'),
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', response.status, errorText);
        throw new Error(`Failed to send email: ${response.status} ${errorText}`);
      }

      toast.success(t('booking.success'), {
        position: 'bottom-center',
        duration: 3000,
        className: 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg text-base',
        style: {
          marginBottom: '1rem',
          zIndex: 50
        }
      });
      reset();
      setCheckIn(undefined);
      setCheckOut(undefined);
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Display a more user-friendly error message
      toast.error(t('booking.error.submit'), {
        position: 'bottom-center',
        duration: 3000,
        className: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg text-base',
        style: {
          marginBottom: '1rem',
          zIndex: 50
        }
      });
      
      // Show a more detailed error for debugging in console
      console.error('Detailed error information:', {
        message: error.message,
        hostname: window.location.hostname,
        isProduction: import.meta.env.MODE === 'production',
        apiKey: import.meta.env.VITE_RESEND_API_KEY ? 'Present (length: ' + import.meta.env.VITE_RESEND_API_KEY.length + ')' : 'Missing'
      });
    }
  };

  return (
    <section id="booking" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-mountain-800 mb-4">
              {t('booking.title')}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                {/* <Label className="text-lg font-medium">{t('booking.checkIn')} & {t('booking.checkOut')}</Label> */}
                {checkIn && checkOut && (
                  <div className="text-tatryhome-700 font-medium">
                    {format(checkIn, "PPP", { locale: getLocale() })} - {format(checkOut, "PPP", { locale: getLocale() })}
                  </div>
                )}
              </div>
              
              <div className="border rounded-lg p-4 md:p-6 bg-white shadow-sm">
                <style>
                  {`
                  /* Selection style fixes */
                  .rdp-day_selected, 
                  .rdp-day_selected:focus, 
                  .rdp-day_selected:hover {
                    background-color: #0284c7 !important;
                    color: white !important;
                  }
                  
                  .rdp-day_range_middle {
                    background-color: #bae6fd !important;
                    color: #0369a1 !important;
                  }
                  
                  /* Ensure cell background colors work properly */
                  .rdp-cell[aria-selected="true"],
                  .rdp-cell:has([aria-selected="true"]) {
                    background-color: transparent !important;
                  }
                  
                  /* Availability styles - stronger selectors to increase specificity */
                  button.rdp-day.available-day:not([aria-selected="true"]) {
                    background-color: #dcfce7 !important;
                    color: #16a34a !important;
                    font-weight: bold !important;
                  }
                  
                  button.rdp-day.unavailable-day:not([aria-selected="true"]) {
                    background-color: #fee2e2 !important;
                    color: #dc2626 !important;
                    font-weight: bold !important;
                  }
                  
                  /* Custom selector for modifiers to ensure they work */
                  .available-day:not([aria-selected="true"]) {
                    background-color: #dcfce7 !important;
                    color: #16a34a !important;
                  }
                  
                  .unavailable-day:not([aria-selected="true"]) {
                    background-color: #fee2e2 !important;
                    color: #dc2626 !important;
                  }
                  `}
                </style>
                
                <Calendar
                  mode="range"
                  selected={{ from: checkIn, to: checkOut }}
                  onSelect={handleDateSelect}
                  disabled={isDateDisabled}
                  fromDate={tomorrow}
                  locale={getLocale()}
                  numberOfMonths={1}
                  showOutsideDays
                  fixedWeeks
                  ISOWeek
                  className="md:hidden w-full"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                    day_range_end: "day-range-end",
                    day_selected: "bg-sky-600 text-white hover:bg-sky-600 hover:text-white focus:bg-sky-600 focus:text-white",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                    day_disabled: "text-muted-foreground opacity-50 line-through",
                    day_range_middle: "rdp-day_range_middle",
                    day_hidden: "invisible",
                  }}
                  modifiers={{
                    available: (date) => isDateAvailable(date, bookings),
                    unavailable: (date) => !isDateAvailable(date, bookings),
                  }}
                  modifiersClassNames={{
                    available: "available-day",
                    unavailable: "unavailable-day",
                  }}
                />
                
                <div className="hidden md:flex justify-center w-full">
                  <Calendar
                    mode="range"
                    selected={{ from: checkIn, to: checkOut }}
                    onSelect={handleDateSelect}
                    disabled={isDateDisabled}
                    fromDate={tomorrow}
                    locale={getLocale()}
                    className="w-full max-w-3xl"
                    numberOfMonths={2}
                    showOutsideDays
                    fixedWeeks
                    ISOWeek
                    classNames={{
                      months: "flex flex-row space-x-8 justify-center",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      day_range_end: "day-range-end",
                      day_selected: "bg-sky-600 text-white hover:bg-sky-600 hover:text-white focus:bg-sky-600 focus:text-white",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                      day_disabled: "text-muted-foreground opacity-50 line-through",
                      day_range_middle: "rdp-day_range_middle",
                      day_hidden: "invisible",
                    }}
                    modifiers={{
                      available: (date) => isDateAvailable(date, bookings),
                      unavailable: (date) => !isDateAvailable(date, bookings),
                    }}
                    modifiersClassNames={{
                      available: "available-day",
                      unavailable: "unavailable-day",
                    }}
                  />
                </div>
              </div>

              {checkIn && checkOut && isPeriodAvailable(checkIn, checkOut, bookings) && (
                <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  <p className="text-base">{t('booking.available_message')}</p>
                </div>
              )}
            </div>

            {checkIn && checkOut && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">{t('booking.firstName')}</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", { required: t('booking.error.firstName') })}
                      className={cn(errors.firstName && "border-red-500")}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">{t('booking.lastName')}</Label>
                    <Input
                      id="lastName"
                      {...register("lastName", { required: t('booking.error.lastName') })}
                      className={cn(errors.lastName && "border-red-500")}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">{t('booking.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: t('booking.error.email'),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('booking.error.emailInvalid'),
                        },
                      })}
                      className={cn(errors.email && "border-red-500")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('booking.phone')}</Label>
                    <Input
                      id="phone"
                      {...register("phone", { required: t('booking.error.phone') })}
                      className={cn(errors.phone && "border-red-500")}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-tatryhome-700 hover:bg-tatryhome-800 text-lg py-6">
                  {t('booking.askForOffer')}
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
