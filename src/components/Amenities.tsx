
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

// Amenity type
interface Amenity {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const amenities: Amenity[] = [
  {
    icon: <Bed className="h-6 w-6" />,
    name: "Comfortable Beds",
    description: "Quality mattresses and linens for a restful sleep"
  },
  {
    icon: <Wifi className="h-6 w-6" />,
    name: "Free Wi-Fi",
    description: "High-speed internet throughout the apartment"
  },
  {
    icon: <Tv className="h-6 w-6" />,
    name: "Smart TV",
    description: "Flat-screen TV with streaming capabilities"
  },
  {
    icon: <UtensilsCrossed className="h-6 w-6" />,
    name: "Fully Equipped Kitchen",
    description: "Everything you need to prepare your meals"
  },
  {
    icon: <CarFront className="h-6 w-6" />,
    name: "Free Parking",
    description: "Convenient parking space for your vehicle"
  },
  {
    icon: <Mountain className="h-6 w-6" />,
    name: "Mountain View",
    description: "Stunning panorama of the Tatra Mountains"
  },
  {
    icon: <Thermometer className="h-6 w-6" />,
    name: "Heating & Cooling",
    description: "Comfortable temperature year-round"
  },
  {
    icon: <ShowerHead className="h-6 w-6" />,
    name: "Modern Bathroom",
    description: "Shower, toiletries, and fresh towels provided"
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    name: "Coffee Machine",
    description: "Start your day with a perfect cup of coffee"
  }
];

const Amenities = () => {
  return (
    <section id="amenities" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mountain-800 mb-4">
            Apartment Amenities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our apartment is equipped with everything you need for a comfortable and enjoyable stay.
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
                <h3 className="font-semibold text-lg text-mountain-800">{amenity.name}</h3>
              </div>
              <p className="text-gray-600">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
