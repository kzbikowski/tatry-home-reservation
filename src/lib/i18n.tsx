import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pl';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  pl: {
    // Hero
    'hero.title': 'Witamy w Tatry Home',
    'hero.subtitle': 'Poznaj piękno Tatr w naszym komfortowym i stylowym apartamencie. Idealne miejsce na górski wypoczynek.',
    'hero.bookButton': 'Zarezerwuj Pobyt',
    'hero.galleryButton': 'Zobacz Galerię',

    // About
    'about.title': 'Twoja Idealna Górska Oaza',
    'about.description1': 'Tatry Home oferuje wyjątkowy pobyt w sercu pięknych Tatr. Nasz nowoczesny apartament zapewnia cały komfort i udogodnienia potrzebne na niezapomniane wakacje w górach.',
    'about.description2': 'Niezależnie czy planujesz romantyczny wyjazd, wakacje z rodziną czy przygodę ze znajomymi, nasz apartament jest idealną bazą do odkrywania zapierających dech krajobrazów, szlaków turystycznych i atrakcji kulturalnych regionu.',
    'about.checkAvailability': 'Sprawdź Dostępność',
    'about.learnMore': 'Dowiedz Się Więcej',
    'about.comfortable': 'Komfortowy i Nowoczesny',
    'about.equipped': 'W pełni wyposażony dla Twojej wygody',

    // Gallery
    'gallery.title': 'Galeria Apartamentu',
    'gallery.subtitle': 'Zapraszamy na wirtualną wycieczkę po naszym pięknym apartamencie i zobacz, co czeka na Ciebie w Tatry Home.',
    'gallery.livingArea': 'Pokój dzienny',
    'gallery.mountainView': 'Widok na góry',
    'gallery.bedroom': 'Sypialnia',
    'gallery.houseExterior': 'Wygląd zewnętrzny',
    'gallery.kitchen': 'Kuchnia',
    'gallery.bathroom': 'Łazienka',
    'gallery.livingArea2': 'Pokój dzienny widok 2',
    'gallery.bedroom2': 'Druga sypialnia',
    'gallery.kitchen2': 'Kuchnia widok 2',

    // Navigation
    'nav.home': 'Strona Główna',
    'nav.gallery': 'Galeria',
    'nav.amenities': 'Udogodnienia',
    'nav.bookNow': 'Rezerwacja',
    'nav.contact': 'Kontakt',
    'nav.reserve': 'Zarezerwuj',

    // Amenities
    'amenities.title': 'Udogodnienia Apartamentu',
    'amenities.subtitle': 'Wszystko, czego potrzebujesz na komfortowy pobyt',
    'amenities.comfortableBeds': 'Komfortowe Łóżka',
    'amenities.comfortableBedsDesc': 'Jakościowe materace i pościel dla spokojnego snu',
    'amenities.wifi': 'Darmowe Wi-Fi',
    'amenities.wifiDesc': 'Szybki internet w całym apartamencie',
    'amenities.smartTv': 'Smart TV',
    'amenities.smartTvDesc': 'Telewizor z płaskim ekranem i możliwością streamingu',
    'amenities.kitchen': 'W pełni Wyposażona Kuchnia',
    'amenities.kitchenDesc': 'Wszystko, czego potrzebujesz do przygotowania posiłków',
    'amenities.parking': 'Darmowy Parking',
    'amenities.parkingDesc': 'Wygodne miejsce parkingowe dla Twojego pojazdu',
    'amenities.mountainView': 'Widok na Góry',
    'amenities.mountainViewDesc': 'Zapierający dech widok na Tatry',
    'amenities.heating': 'Ogrzewanie i Klimatyzacja',
    'amenities.heatingDesc': 'Komfortowa temperatura przez cały rok',
    'amenities.bathroom': 'Nowoczesna Łazienka',
    'amenities.bathroomDesc': 'Prysznic, środki higieniczne i świeże ręczniki',
    'amenities.coffee': 'Ekspres do Kawy',
    'amenities.coffeeDesc': 'Rozpocznij dzień od idealnej filiżanki kawy',

    // Booking
    'booking.title': 'Zarezerwuj Swój Pobyt',
    'booking.subtitle': 'Wypełnij formularz poniżej, aby zarezerwować pobyt na wybrane daty.',
    'booking.firstName': 'Imię',
    'booking.lastName': 'Nazwisko',
    'booking.email': 'Email',
    'booking.phone': 'Telefon',
    'booking.checkIn': 'Data Zameldowania',
    'booking.checkOut': 'Data Wymeldowania',
    'booking.guests': 'Liczba Gości',
    'booking.message': 'Specjalne Wymagania',
    'booking.messagePlaceholder': 'Specjalne wymagania lub pytania?',
    'booking.submit': 'Wyślij Zgłoszenie',
    'booking.pickDate': 'Wybierz datę',
    'booking.error.firstName': 'Imię jest wymagane',
    'booking.error.lastName': 'Nazwisko jest wymagane',
    'booking.error.email': 'Email jest wymagany',
    'booking.error.emailInvalid': 'Nieprawidłowy adres email',
    'booking.error.phone': 'Numer telefonu jest wymagany',
    'booking.error.guests': 'Liczba gości jest wymagana',
    'booking.error.guestsMin': 'Minimum 1 gość',
    'booking.error.guestsMax': 'Maksymalnie 6 gości',
    'booking.error.dates': 'Proszę wybrać daty zameldowania i wymeldowania',
    'booking.success': 'Zgłoszenie wysłane pomyślnie! Skontaktujemy się wkrótce.',

    // Contact
    'contact.title': 'Skontaktuj się z Nami',
    'contact.subtitle': 'Masz pytania? Chętnie na nie odpowiemy',
    'contact.phone': 'Telefon',
    'contact.phoneNumber': '+48 123 456 789',
    'contact.phoneHours': 'Dostępny 9:00 - 20:00',
    'contact.email': 'Email',
    'contact.emailAddress': 'contact@tatryhome.pl',
    'contact.emailResponse': 'Odpowiemy najszybciej jak to możliwe',
    'contact.location': 'Lokalizacja',
    'contact.address': 'Zakopane, Polska',
    'contact.addressDesc': 'W sercu Tatr',
    'contact.bookingCom': 'Zobacz na Booking.com',

    // Footer
    'footer.contact': 'Kontakt',
    'footer.address': 'Adres',
    'footer.phone': 'Telefon',
    'footer.email': 'Email',
    'footer.followUs': 'Śledź Nas',
    'footer.rights': 'Wszelkie prawa zastrzeżone',
    'footer.quickLinks': 'Szybkie Linki',
    'footer.home': 'Strona Główna',
    'footer.gallery': 'Galeria',
    'footer.amenities': 'Udogodnienia',
    'footer.booking': 'Rezerwacja',
    'footer.nearbyAttractions': 'Okoliczne Atrakcje',
    'footer.tatraPark': 'Tatrzański Park Narodowy',
    'footer.krupowki': 'Ulica Krupówki',
    'footer.gubalowka': 'Gubałówka',
    'footer.kasprowy': 'Kasprowy Wierch',
    'footer.legal': 'Informacje Prawne',
    'footer.privacy': 'Polityka Prywatności',
    'footer.terms': 'Regulamin',
    'footer.cookies': 'Polityka Cookies',
  },
  en: {
    // Hero
    'hero.title': 'Welcome to Tatry Home',
    'hero.subtitle': 'Experience the beauty of Tatra Mountains in our comfortable and stylish apartment. The perfect accommodation for your mountain getaway.',
    'hero.bookButton': 'Book Your Stay',
    'hero.galleryButton': 'View Gallery',

    // About
    'about.title': 'Your Perfect Mountain Retreat',
    'about.description1': 'Tatry Home offers an exceptional stay in the heart of the beautiful Tatra Mountains. Our modern apartment provides all the comfort and amenities you need for an unforgettable mountain vacation.',
    'about.description2': 'Whether you\'re planning a romantic getaway, a family vacation, or an adventure with friends, our apartment is the perfect base for exploring the stunning natural landscapes, hiking trails, and cultural attractions of the region.',
    'about.checkAvailability': 'Check Availability',
    'about.learnMore': 'Learn More',
    'about.comfortable': 'Comfortable & Modern',
    'about.equipped': 'Fully equipped for your convenience',

    // Gallery
    'gallery.title': 'Apartment Gallery',
    'gallery.subtitle': 'Take a visual tour of our beautiful apartment and see what awaits you at Tatry Home.',
    'gallery.livingArea': 'Living area',
    'gallery.mountainView': 'Mountain view',
    'gallery.bedroom': 'Bedroom',
    'gallery.houseExterior': 'House exterior',
    'gallery.kitchen': 'Kitchen area',
    'gallery.bathroom': 'Bathroom',
    'gallery.livingArea2': 'Living area view 2',
    'gallery.bedroom2': 'Second bedroom',
    'gallery.kitchen2': 'Kitchen view 2',

    // Navigation
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.amenities': 'Amenities',
    'nav.bookNow': 'Book Now',
    'nav.contact': 'Contact',
    'nav.reserve': 'Reserve',

    // Amenities
    'amenities.title': 'Apartment Amenities',
    'amenities.subtitle': 'Everything you need for a comfortable stay',

    // Booking
    'booking.title': 'Book Your Stay',
    'booking.subtitle': 'Check availability and reserve the apartment',

    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions? We\'d love to hear from you',

    // Footer
    'footer.contact': 'Contact',
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pl');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 