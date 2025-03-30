
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container relative h-full mx-auto px-4 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
          Welcome to <span className="text-tatryhome-300">Tatry Home</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Experience the beauty of Tatra Mountains in our comfortable and stylish apartment.
          The perfect accommodation for your mountain getaway.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Button 
            className="bg-tatryhome-700 hover:bg-tatryhome-800 text-white font-medium px-6 py-3 text-lg"
            onClick={() => scrollToSection('booking')}
          >
            Book Your Stay
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/20 font-medium px-6 py-3 text-lg"
            onClick={() => scrollToSection('gallery')}
          >
            View Gallery
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
