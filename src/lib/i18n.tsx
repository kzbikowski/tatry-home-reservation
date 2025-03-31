import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pl' | 'de';

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
    'booking.error.dates_unavailable': 'Wybrane daty nie są dostępne',
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
    'amenities.comfortableBeds': 'Comfortable Beds',
    'amenities.comfortableBedsDesc': 'Quality mattresses and bedding for a peaceful sleep',
    'amenities.wifi': 'Free Wi-Fi',
    'amenities.wifiDesc': 'Fast internet throughout the apartment',
    'amenities.smartTv': 'Smart TV',
    'amenities.smartTvDesc': 'Flat-screen TV with streaming capabilities',
    'amenities.kitchen': 'Fully Equipped Kitchen',
    'amenities.kitchenDesc': 'Everything you need to prepare meals',
    'amenities.parking': 'Free Parking',
    'amenities.parkingDesc': 'Convenient parking space for your vehicle',
    'amenities.mountainView': 'Mountain View',
    'amenities.mountainViewDesc': 'Breathtaking views of the Tatra Mountains',
    'amenities.heating': 'Heating & Air Conditioning',
    'amenities.heatingDesc': 'Comfortable temperature year-round',
    'amenities.bathroom': 'Modern Bathroom',
    'amenities.bathroomDesc': 'Shower, toiletries, and fresh towels',
    'amenities.coffee': 'Coffee Maker',
    'amenities.coffeeDesc': 'Start your day with a perfect cup of coffee',

    // Booking
    'booking.title': 'Book Your Stay',
    'booking.subtitle': 'Fill out the form below to book your stay for selected dates.',
    'booking.firstName': 'First Name',
    'booking.lastName': 'Last Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone',
    'booking.checkIn': 'Check-in Date',
    'booking.checkOut': 'Check-out Date',
    'booking.guests': 'Number of Guests',
    'booking.message': 'Special Requirements',
    'booking.messagePlaceholder': 'Any special requirements or questions?',
    'booking.submit': 'Submit Booking',
    'booking.pickDate': 'Pick a date',
    'booking.error.firstName': 'First name is required',
    'booking.error.lastName': 'Last name is required',
    'booking.error.email': 'Email is required',
    'booking.error.emailInvalid': 'Invalid email address',
    'booking.error.phone': 'Phone number is required',
    'booking.error.guests': 'Number of guests is required',
    'booking.error.guestsMin': 'Minimum 1 guest',
    'booking.error.guestsMax': 'Maximum 6 guests',
    'booking.error.dates': 'Please select check-in and check-out dates',
    'booking.error.dates_unavailable': 'Selected dates are not available',
    'booking.success': 'Booking request sent successfully! We will contact you soon.',

    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions? We\'d love to hear from you',
    'contact.phone': 'Phone',
    'contact.phoneNumber': '+48 123 456 789',
    'contact.phoneHours': 'Available 9:00 AM - 8:00 PM',
    'contact.email': 'Email',
    'contact.emailAddress': 'contact@tatryhome.pl',
    'contact.emailResponse': 'We will respond as soon as possible',
    'contact.location': 'Location',
    'contact.address': 'Zakopane, Poland',
    'contact.addressDesc': 'In the heart of the Tatra Mountains',
    'contact.bookingCom': 'View on Booking.com',

    // Footer
    'footer.contact': 'Contact',
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved',
    'footer.quickLinks': 'Quick Links',
    'footer.home': 'Home',
    'footer.gallery': 'Gallery',
    'footer.amenities': 'Amenities',
    'footer.booking': 'Booking',
    'footer.nearbyAttractions': 'Nearby Attractions',
    'footer.tatraPark': 'Tatra National Park',
    'footer.krupowki': 'Krupówki Street',
    'footer.gubalowka': 'Gubałówka',
    'footer.kasprowy': 'Kasprowy Wierch',
    'footer.legal': 'Legal Information',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.cookies': 'Cookie Policy',
  },
  de: {
    // Hero
    'hero.title': 'Willkommen bei Tatry Home',
    'hero.subtitle': 'Erleben Sie die Schönheit der Tatra-Berge in unserer komfortablen und stilvollen Wohnung. Die perfekte Unterkunft für Ihren Bergurlaub.',
    'hero.bookButton': 'Jetzt Buchen',
    'hero.galleryButton': 'Galerie Ansehen',

    // About
    'about.title': 'Ihr Perfekter Bergurlaub',
    'about.description1': 'Tatry Home bietet einen außergewöhnlichen Aufenthalt im Herzen der schönen Tatra-Berge. Unsere moderne Wohnung bietet allen Komfort und Annehmlichkeiten für einen unvergesslichen Bergurlaub.',
    'about.description2': 'Egal ob Sie einen romantischen Urlaub, einen Familienurlaub oder ein Abenteuer mit Freunden planen, unsere Wohnung ist die perfekte Basis für die Erkundung der atemberaubenden Naturlandschaften, Wanderwege und kulturellen Sehenswürdigkeiten der Region.',
    'about.checkAvailability': 'Verfügbarkeit Prüfen',
    'about.learnMore': 'Mehr Erfahren',
    'about.comfortable': 'Komfortabel & Modern',
    'about.equipped': 'Voll ausgestattet für Ihren Komfort',

    // Gallery
    'gallery.title': 'Wohnungsgalerie',
    'gallery.subtitle': 'Machen Sie einen visuellen Rundgang durch unsere schöne Wohnung und sehen Sie, was Sie bei Tatry Home erwartet.',
    'gallery.livingArea': 'Wohnbereich',
    'gallery.mountainView': 'Bergblick',
    'gallery.bedroom': 'Schlafzimmer',
    'gallery.houseExterior': 'Außenansicht',
    'gallery.kitchen': 'Küchenbereich',
    'gallery.bathroom': 'Badezimmer',
    'gallery.livingArea2': 'Wohnbereich Ansicht 2',
    'gallery.bedroom2': 'Zweites Schlafzimmer',
    'gallery.kitchen2': 'Küchenansicht 2',

    // Navigation
    'nav.home': 'Startseite',
    'nav.gallery': 'Galerie',
    'nav.amenities': 'Ausstattung',
    'nav.bookNow': 'Jetzt Buchen',
    'nav.contact': 'Kontakt',
    'nav.reserve': 'Reservieren',

    // Amenities
    'amenities.title': 'Wohnungsausstattung',
    'amenities.subtitle': 'Alles, was Sie für einen komfortablen Aufenthalt benötigen',
    'amenities.comfortableBeds': 'Komfortable Betten',
    'amenities.comfortableBedsDesc': 'Qualitätsmatratzen und Bettwäsche für einen erholsamen Schlaf',
    'amenities.wifi': 'Kostenloses WLAN',
    'amenities.wifiDesc': 'Schnelles Internet in der gesamten Wohnung',
    'amenities.smartTv': 'Smart TV',
    'amenities.smartTvDesc': 'Flachbildfernseher mit Streaming-Möglichkeiten',
    'amenities.kitchen': 'Voll ausgestattete Küche',
    'amenities.kitchenDesc': 'Alles, was Sie für die Zubereitung von Mahlzeiten benötigen',
    'amenities.parking': 'Kostenlose Parkplätze',
    'amenities.parkingDesc': 'Bequemer Parkplatz für Ihr Fahrzeug',
    'amenities.mountainView': 'Bergblick',
    'amenities.mountainViewDesc': 'Atemberaubende Aussicht auf die Tatra-Berge',
    'amenities.heating': 'Heizung & Klimaanlage',
    'amenities.heatingDesc': 'Komfortable Temperatur das ganze Jahr über',
    'amenities.bathroom': 'Modernes Badezimmer',
    'amenities.bathroomDesc': 'Dusche, Toilettenartikel und frische Handtücher',
    'amenities.coffee': 'Kaffeemaschine',
    'amenities.coffeeDesc': 'Beginnen Sie den Tag mit einer perfekten Tasse Kaffee',

    // Booking
    'booking.title': 'Buchen Sie Ihren Aufenthalt',
    'booking.subtitle': 'Füllen Sie das Formular unten aus, um Ihren Aufenthalt für die gewählten Daten zu buchen.',
    'booking.firstName': 'Vorname',
    'booking.lastName': 'Nachname',
    'booking.email': 'E-Mail',
    'booking.phone': 'Telefon',
    'booking.checkIn': 'Check-in Datum',
    'booking.checkOut': 'Check-out Datum',
    'booking.guests': 'Anzahl der Gäste',
    'booking.message': 'Besondere Anforderungen',
    'booking.messagePlaceholder': 'Besondere Anforderungen oder Fragen?',
    'booking.submit': 'Buchung Absenden',
    'booking.pickDate': 'Datum auswählen',
    'booking.error.firstName': 'Vorname ist erforderlich',
    'booking.error.lastName': 'Nachname ist erforderlich',
    'booking.error.email': 'E-Mail ist erforderlich',
    'booking.error.emailInvalid': 'Ungültige E-Mail-Adresse',
    'booking.error.phone': 'Telefonnummer ist erforderlich',
    'booking.error.guests': 'Anzahl der Gäste ist erforderlich',
    'booking.error.guestsMin': 'Mindestens 1 Gast',
    'booking.error.guestsMax': 'Maximal 6 Gäste',
    'booking.error.dates': 'Bitte wählen Sie Check-in und Check-out Daten',
    'booking.error.dates_unavailable': 'Ausgewählte Daten sind nicht verfügbar',
    'booking.success': 'Buchungsanfrage erfolgreich gesendet! Wir werden uns bald bei Ihnen melden.',

    // Contact
    'contact.title': 'Kontaktieren Sie Uns',
    'contact.subtitle': 'Haben Sie Fragen? Wir freuen uns von Ihnen zu hören',
    'contact.phone': 'Telefon',
    'contact.phoneNumber': '+48 123 456 789',
    'contact.phoneHours': 'Verfügbar 9:00 - 20:00',
    'contact.email': 'E-Mail',
    'contact.emailAddress': 'contact@tatryhome.pl',
    'contact.emailResponse': 'Wir werden uns schnellstmöglich bei Ihnen melden',
    'contact.location': 'Standort',
    'contact.address': 'Zakopane, Polen',
    'contact.addressDesc': 'Im Herzen der Tatra-Berge',
    'contact.bookingCom': 'Auf Booking.com ansehen',

    // Footer
    'footer.contact': 'Kontakt',
    'footer.address': 'Adresse',
    'footer.phone': 'Telefon',
    'footer.email': 'E-Mail',
    'footer.followUs': 'Folgen Sie Uns',
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.quickLinks': 'Schnelllinks',
    'footer.home': 'Startseite',
    'footer.gallery': 'Galerie',
    'footer.amenities': 'Ausstattung',
    'footer.booking': 'Buchung',
    'footer.nearbyAttractions': 'Sehenswürdigkeiten in der Nähe',
    'footer.tatraPark': 'Tatra-Nationalpark',
    'footer.krupowki': 'Krupówki-Straße',
    'footer.gubalowka': 'Gubałówka',
    'footer.kasprowy': 'Kasprowy Wierch',
    'footer.legal': 'Rechtliche Informationen',
    'footer.privacy': 'Datenschutzerklärung',
    'footer.terms': 'AGB',
    'footer.cookies': 'Cookie-Richtlinie',
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