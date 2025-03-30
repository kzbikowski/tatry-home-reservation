
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
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const onSubmit = (data: BookingFormData) => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    // In a real application, you would send this data to your backend
    console.log({
      ...data,
      checkIn,
      checkOut,
    });

    toast.success("Booking request sent successfully! We'll contact you soon.");
    reset();
    setCheckIn(undefined);
    setCheckOut(undefined);
  };

  return (
    <section id="booking" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-mountain-800 mb-4">
              Book Your Stay
            </h2>
            <p className="text-gray-600">
              Fill out the form below to request a reservation for your preferred dates.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName", { required: "First name is required" })}
                  className={cn(errors.firstName && "border-red-500")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName", { required: "Last name is required" })}
                  className={cn(errors.lastName && "border-red-500")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register("phone", { required: "Phone number is required" })}
                  className={cn(errors.phone && "border-red-500")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Check-in Date</Label>
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
                      {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
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
                <Label>Check-out Date</Label>
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
                      {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      disabled={(date) => date < (checkIn || new Date())}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="6"
                  defaultValue="2"
                  {...register("guests", {
                    required: "Number of guests is required",
                    min: {
                      value: 1,
                      message: "Minimum 1 guest",
                    },
                    max: {
                      value: 6,
                      message: "Maximum 6 guests",
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
              <Label htmlFor="message">Special Requests</Label>
              <Textarea
                id="message"
                placeholder="Any special requests or questions?"
                {...register("message")}
                className="h-32"
              />
            </div>

            <Button type="submit" className="w-full bg-tatryhome-700 hover:bg-tatryhome-800 text-lg py-6">
              Send Booking Request
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
