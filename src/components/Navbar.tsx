
import { useState } from 'react';
import { Menu, X, Home, Calendar, Image, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      // Add a slight delay to ensure the element is found and scrolled to
      setTimeout(() => {
        bookingSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
      
      // Also update URL hash for better UX
      history.pushState({}, '', `#booking`);
    } else {
      console.error("Booking section not found");
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-tatryhome-700" />
            <span className="font-bold text-xl text-tatryhome-700">Tatry Home</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">Home</a>
            <a href="#gallery" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">Gallery</a>
            <a href="#amenities" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">Amenities</a>
            <a href="#booking" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">Book Now</a>
            <a href="#contact" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">Contact</a>
            <Button 
              variant="default" 
              className="bg-tatryhome-700 hover:bg-tatryhome-800"
              onClick={scrollToBooking}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Reserve
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#home" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#gallery" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Gallery</a>
            <a href="#amenities" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Amenities</a>
            <a href="#booking" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Book Now</a>
            <a href="#contact" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Contact</a>
            <Button 
              className="bg-tatryhome-700 hover:bg-tatryhome-800 w-full"
              onClick={() => {
                scrollToBooking();
                setIsOpen(false);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Reserve Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
