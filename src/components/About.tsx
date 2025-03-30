
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-mountain-800 mb-6">
              Your Perfect Mountain Retreat
            </h2>
            <p className="text-gray-700 mb-4 text-lg">
              Tatry Home offers an exceptional stay in the heart of the beautiful Tatra Mountains. Our modern apartment provides all the comfort and amenities you need for an unforgettable mountain vacation.
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              Whether you're planning a romantic getaway, a family vacation, or an adventure with friends, our apartment is the perfect base for exploring the stunning natural landscapes, hiking trails, and cultural attractions of the region.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-tatryhome-700 hover:bg-tatryhome-800">
                Check Availability
              </Button>
              <Button variant="outline" className="border-tatryhome-700 text-tatryhome-700 hover:bg-tatryhome-50">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1000&q=80" 
              alt="Tatry Home Interior" 
              className="rounded-lg shadow-xl object-cover w-full h-[400px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="font-bold text-mountain-800">Comfortable & Modern</p>
              <p className="text-gray-600">Fully equipped for your convenience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
