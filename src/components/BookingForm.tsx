import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format, isBefore, isAfter, isSameDay } from "date-fns";
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
  guests: number;
  message: string;
}

const BookingForm = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [bookings, setBookings] = useState<Array<{ start: Date; end: Date }>>([]);
  const { t } = useLanguage();
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  
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
    const isDisabled = !isDateAvailable(date, bookings);
    // console.log('Date disabled check:', {
    //   date: format(date, 'yyyy-MM-dd'),
    //   isDisabled,
    //   bookings: bookings.map(b => ({
    //     start: format(b.start, 'yyyy-MM-dd'),
    //     end: format(b.end, 'yyyy-MM-dd')
    //   }))
    // });
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
      // Use proxy in development, direct API in production
      const apiUrl = import.meta.env.DEV 
        ? '/api/resend/emails'
        : 'https://api.resend.com/emails';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Tatry Home <booking@tatryhome.com>',
          to: ['tatryhome@gmail.com'],
          subject: t('booking.email.subject'),
          html: `
            <h2>${t('booking.email.newBooking')}</h2>
            <p><strong>${t('booking.email.checkIn')}:</strong> ${format(checkIn, "PPP")}</p>
            <p><strong>${t('booking.email.checkOut')}:</strong> ${format(checkOut, "PPP")}</p>
            <p><strong>${t('booking.email.guests')}:</strong> ${data.guests}</p>
            <p><strong>${t('booking.email.name')}:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>${t('booking.email.email')}:</strong> ${data.email}</p>
            <p><strong>${t('booking.email.phone')}:</strong> ${data.phone}</p>
            <p><strong>${t('booking.email.message')}:</strong></p>
            <p>${data.message}</p>
          `,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
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
      toast.error(t('booking.error.submit'), {
        position: 'bottom-center',
        duration: 3000,
        className: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg text-base',
        style: {
          marginBottom: '1rem',
          zIndex: 50
        }
      });
    }
  };

  return (
    <section id="booking" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-mountain-800 mb-4">
              {t('booking.title')}
            </h2>
            <p className="text-gray-600">
              {t('booking.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Label>{t('booking.checkIn')} & {t('booking.checkOut')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkIn && !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn && checkOut ? (
                        <span>
                          {format(checkIn, "PPP")} - {format(checkOut, "PPP")}
                        </span>
                      ) : (
                        <span>{t('booking.pickDate')}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                      mode="range"
                      selected={{ from: checkIn, to: checkOut }}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={isDateDisabled}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="guests">{t('booking.guests')}</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="6"
                  defaultValue="2"
                  {...register("guests", {
                    required: t('booking.error.guests'),
                    min: {
                      value: 1,
                      message: t('booking.error.guestsMin'),
                    },
                    max: {
                      value: 6,
                      message: t('booking.error.guestsMax'),
                    },
                  })}
                  className={cn(errors.guests && "border-red-500")}
                />
                {errors.guests && (
                  <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="message">{t('booking.message')}</Label>
              <Textarea
                id="message"
                placeholder={t('booking.messagePlaceholder')}
                {...register("message")}
                className="h-32"
              />
            </div>

            <Button type="submit" className="w-full bg-tatryhome-700 hover:bg-tatryhome-800 text-lg py-6">
              {t('booking.submit')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
