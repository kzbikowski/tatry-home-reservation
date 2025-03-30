import { 
  Bed, 
  Wifi, 
  Tv, 
  UtensilsCrossed, 
  CarFront, 
  Mountain, 
  Thermometer, 
  ShowerHead,
  Coffee
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

// Amenity type
interface Amenity {
  icon: React.ReactNode;
  nameKey: string;
  descriptionKey: string;
}

const amenities: Amenity[] = [
  {
    icon: <Bed className="h-6 w-6" />,
    nameKey: "amenities.comfortableBeds",
    descriptionKey: "amenities.comfortableBedsDesc"
  },
  {
    icon: <Wifi className="h-6 w-6" />,
    nameKey: "amenities.wifi",
    descriptionKey: "amenities.wifiDesc"
  },
  {
    icon: <Tv className="h-6 w-6" />,
    nameKey: "amenities.smartTv",
    descriptionKey: "amenities.smartTvDesc"
  },
  {
    icon: <UtensilsCrossed className="h-6 w-6" />,
    nameKey: "amenities.kitchen",
    descriptionKey: "amenities.kitchenDesc"
  },
  {
    icon: <CarFront className="h-6 w-6" />,
    nameKey: "amenities.parking",
    descriptionKey: "amenities.parkingDesc"
  },
  {
    icon: <Mountain className="h-6 w-6" />,
    nameKey: "amenities.mountainView",
    descriptionKey: "amenities.mountainViewDesc"
  },
  {
    icon: <Thermometer className="h-6 w-6" />,
    nameKey: "amenities.heating",
    descriptionKey: "amenities.heatingDesc"
  },
  {
    icon: <ShowerHead className="h-6 w-6" />,
    nameKey: "amenities.bathroom",
    descriptionKey: "amenities.bathroomDesc"
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    nameKey: "amenities.coffee",
    descriptionKey: "amenities.coffeeDesc"
  }
];

const Amenities = () => {
  const { t } = useLanguage();
  
  return (
    <section id="amenities" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mountain-800 mb-4">
            {t('amenities.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('amenities.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-tatryhome-100 rounded-full text-tatryhome-700 mr-4">
                  {amenity.icon}
                </div>
                <h3 className="font-semibold text-lg text-mountain-800">{t(amenity.nameKey)}</h3>
              </div>
              <p className="text-gray-600">{t(amenity.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
