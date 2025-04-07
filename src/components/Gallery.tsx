import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { getImagePath } from '@/lib/utils';

// Image gallery data
const galleryImages = [
  {
    src: "images/leaving_room.jpg",
    altKey: "gallery.livingArea"
  },
  {
    src: "images/leaving_room_2.jpg",
    altKey: "gallery.livingArea2"
  },
  {
    src: "images/leaving_room_3.jpg",
    altKey: "gallery.livingArea3"
  },
  // Second row - fireplace and night photos
  {
    src: "images/kominek.jpg",
    altKey: "gallery.fireplace"
  },
  {
    src: "images/night_1.jpg",
    altKey: "gallery.nightView1"
  },
  {
    src: "images/night_2.jpg",
    altKey: "gallery.nightView2"
  },
  {
    src: "images/bedroom1.jpg",
    altKey: "gallery.bedroom"
  },
  {
    src: "images/bedroom2.jpg",
    altKey: "gallery.bedroom2"
  },
  {
    src: "images/kitchen.jpg",
    altKey: "gallery.kitchen"
  },
  {
    src: "images/kitchen_2.jpg",
    altKey: "gallery.kitchen2"
  },
  {
    src: "images/bathroom_1.jpg",
    altKey: "gallery.bathroom"
  },
  {
    src: "images/bathroom_2.jpg",
    altKey: "gallery.bathroom2"
  },
  {
    src: "images/mountain_view.jpg",
    altKey: "gallery.mountainView"
  },
  {
    src: "images/house_outside.jpg",
    altKey: "gallery.houseExterior"
  },
  {
    src: "images/house_outside_2.jpg",
    altKey: "gallery.houseOutside2"
  },
  {
    src: "images/interior_2.jpg",
    altKey: "gallery.interior2"
  },
  {
    src: "images/interior_3.jpg",
    altKey: "gallery.interior3"
  },
  {
    src: "images/interior_4.jpg",
    altKey: "gallery.interior4"
  }
];

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const { t } = useLanguage();

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setCurrentImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: number) => {
    if (currentImage === null) return;
    const newIndex = (currentImage + direction + galleryImages.length) % galleryImages.length;
    setCurrentImage(newIndex);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mountain-800 mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(index)}
            >
              <img
                src={getImagePath(image.src)}
                alt={t(image.altKey)}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 text-white w-full">
                  <p className="font-medium">{t(image.altKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {currentImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <Button 
              variant="ghost" 
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="absolute left-4 text-white hover:bg-white/20 rounded-full p-2"
              onClick={() => navigateImage(-1)}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <img
              src={getImagePath(galleryImages[currentImage].src)}
              alt={t(galleryImages[currentImage].altKey)}
              className="max-h-[80vh] max-w-[80vw] object-contain"
            />
            
            <Button 
              variant="ghost" 
              className="absolute right-4 text-white hover:bg-white/20 rounded-full p-2"
              onClick={() => navigateImage(1)}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
