
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import BookingForm from "@/components/BookingForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Amenities />
      <BookingForm />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
