import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
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
  const { t } = useLanguage();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    if (!checkIn || !checkOut) {
      toast.error(t('booking.error.dates'));
      return;
    }

    try {
      const response = await fetch('/api/resend/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Tatry Home <onboarding@resend.dev>',
          to: ['tatryhomepl@gmail.com'],
          subject: 'New Booking Request - Tatry Home',
          html: `
            <h2>New Booking Request</h2>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> ${data.guests}</p>
            <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      toast.success(t('booking.success'));
      reset();
      setCheckIn(undefined);
      setCheckOut(undefined);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send booking request. Please try again later.');
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
              <div>
                <Label>{t('booking.checkIn')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : <span>{t('booking.pickDate')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>{t('booking.checkOut')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : <span>{t('booking.pickDate')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      disabled={(date) => date < new Date()}
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
