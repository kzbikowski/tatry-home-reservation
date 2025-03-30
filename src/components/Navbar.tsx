import { useState } from 'react';
import { Menu, X, Home, Calendar, Image, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/lib/i18n';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

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

  const scrollToHome = () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      // Add a slight delay to ensure the element is found and scrolled to
      setTimeout(() => {
        homeSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
      
      // Also update URL hash for better UX
      history.pushState({}, '', `#home`);
    } else {
      console.error("Home section not found");
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToHome();
            }}
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Home className="h-6 w-6 text-tatryhome-700" />
            <span className="font-bold text-xl text-tatryhome-700">Tatry Home</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">{t('nav.home')}</a>
            <a href="#gallery" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">{t('nav.gallery')}</a>
            <a href="#amenities" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">{t('nav.amenities')}</a>
            <a href="#booking" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">{t('nav.bookNow')}</a>
            <a href="#contact" className="text-mountain-800 hover:text-tatryhome-600 font-medium transition-colors">{t('nav.contact')}</a>
            <LanguageSwitcher />
            <Button 
              variant="default" 
              className="bg-tatryhome-700 hover:bg-tatryhome-800"
              onClick={scrollToBooking}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {t('nav.reserve')}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
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
            <a href="#home" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>{t('nav.home')}</a>
            <a href="#gallery" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>{t('nav.gallery')}</a>
            <a href="#amenities" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>{t('nav.amenities')}</a>
            <a href="#booking" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>{t('nav.bookNow')}</a>
            <a href="#contact" className="text-mountain-800 py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>{t('nav.contact')}</a>
            <Button 
              className="bg-tatryhome-700 hover:bg-tatryhome-800 w-full"
              onClick={() => {
                scrollToBooking();
                setIsOpen(false);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {t('nav.reserve')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
