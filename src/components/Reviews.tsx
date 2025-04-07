import { Star } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

// Reviews data
const reviewsData = [
  {
    name: "Irepry",
    comment: "Piękny domek w pięknym otoczenieniu takie małe osiedle domków z bramką i portierem na wjeździe w otoczeniu gór i cudownych widoków. Czystość i wystrój na plus. Jest wszystko co potrzebne nawet zmywarka pralka i mikrofalówka. Blisko do szlaków jak i do samego Zakopanego jeśli się jest autem to nie problem za to cisza i piękne widoki to marzenie żeby tak co dzień się budzić w takim miejscu. Żal było odjeżdżać...pewnie jeszcze kiedyś tam wrócimy."
  },
  {
    name: "Wojciech",
    comment: "Apartament ulokowany w zamkniętym terenie wśród kilku stylowych domów. Obiekt zadbany i bardzo czysty. Lokal 8 osobowy przestronny i komfortowy."
  },
  {
    name: "Marta",
    comment: "Bardzo przestronny i nowoczesny apartament, super wyposażony. Byliśmy z przyjaciółmi, miejsce godne polecenia, obsługa super. Właściciel miły pomocny."
  },
  {
    name: "Alex",
    comment: "Host speaks great english, so communcation was super easy. The apartment is located in a quiet, gated community with parking spots. Had no issues with anything, the rooms and facilities were as advertised. An absolutely recommendable place for anyone wanting to stay close to the city center, but still enjoy the peace of the outskirts."
  },
  {
    name: "Marisa",
    comment: "House in a very nice green and quiet area and great host"
  },
  {
    name: "Robert",
    comment: "Bardzo komfortowe, wygodne, przestronne wnętrza, dla rodziny bardzo wyjątkowe miejsce, każdy znalazł dla siebie swój kąt. Rewelacyjne wieczory przy kominku. Dobry punkt do wyjazdu w inne miejsca. Miejsce postojowe przypisane do lokalu. Dobry kontakt z właścicielem i pracownikami. Piękne widoki z okna. Bardzo polecam to miejsce."
  },
  {
    name: "Marta",
    comment: "Przestronne mieszkanie dla całej rodziny, bardzo czysto, na miejscu wszystko co potrzeba. Pralka, zmywarka. Wygodne łóżka, piękne widoki. Plus za parking i miłych Panów na wjeździe."
  },
  {
    name: "Dorota",
    comment: "Przepiękny widok.Lokalizacja- świetna.Bardzo otwarty i komunikatywny właściciel."
  },
  {
    name: "Robert",
    comment: "Kolejny udany pobyt w tej lokalizacji, z dala od hałasu i nadmiaru turystów. Polecam niezdecydowanym. Będziecie wracać."
  },
  {
    name: "Ewelina",
    comment: "Wspaniały nowy dom w góralskim stylu, z dala od zgiełku. Z okien piękna panorama Tatr. Dogodna lokalizacja, blisko do Doliny Chochołowskiej i Kościeliskiej."
  }
];

// Helper function to categorize reviews by length
const categorizeReviews = () => {
  const long = [];
  const medium = [];
  const short = [];
  
  for (const review of reviewsData) {
    if (review.comment.length > 200) {
      long.push(review);
    } else if (review.comment.length > 80) {
      medium.push(review);
    } else {
      short.push(review);
    }
  }
  
  return { long, medium, short };
};

const Reviews = () => {
  const { t } = useLanguage();
  const { long, medium, short } = categorizeReviews();
  
  return (
    <section id="guest-stories" className="py-12 md:py-16 bg-gray-50 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-mountain-800">
            {t('reviews.title')}
          </h2>
          <div className="flex items-center mt-3 md:mt-0 md:ml-4">
            <div className="bg-white border border-gray-200 py-1 px-3 rounded-md flex items-center shadow-sm">
              <div className="flex items-center">
                <div className="bg-[#003580] text-white font-bold py-1 px-2 rounded-sm text-sm mr-2">9.4</div>
                <div className="flex flex-col">
                  <span className="text-[#003580] font-bold text-sm">Exceptional</span>
                </div>
              </div>
              <div className="ml-2 pl-2 border-l border-gray-200">
                <div className="text-[#003580] font-bold text-sm tracking-tight">
                  Booking.com
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="w-full max-w-6xl">
            {/* Cloud layout */}
            <div className="relative mx-auto">
              {/* Long reviews - larger boxes */}
              <div className="flex flex-wrap justify-center mb-4">
                {long.map((review, index) => (
                  <div 
                    key={`long-${index}`} 
                    className="w-full md:w-1/2 lg:w-1/3 p-2"
                  >
                    <div className="bg-white p-4 rounded-md shadow-sm hover:shadow transition-shadow duration-200 border border-gray-100 h-full flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-tatryhome-50 rounded-full flex items-center justify-center text-tatryhome-700 text-xs font-semibold mr-2 flex-shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <h3 className="font-medium text-sm text-tatryhome-700">{review.name}</h3>
                      </div>
                      <div className="relative">
                        <p className="text-gray-700 text-base leading-relaxed italic text-left">
                          <span className="text-tatryhome-700 text-xl font-serif mr-1">"</span>
                          {review.comment}
                          <span className="text-tatryhome-700 text-xl font-serif ml-1">"</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Medium reviews - scattered in middle */}
              <div className="flex flex-wrap justify-center mb-3">
                {medium.map((review, index) => (
                  <div 
                    key={`medium-${index}`} 
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-1"
                    style={{ transform: index % 2 === 0 ? 'translateY(-8px)' : 'translateY(8px)' }}
                  >
                    <div className="bg-white p-3 rounded-md shadow-sm hover:shadow transition-shadow duration-200 border border-gray-100 h-full flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-tatryhome-50 rounded-full flex items-center justify-center text-tatryhome-700 text-xs font-semibold mr-2 flex-shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <h3 className="font-medium text-sm text-tatryhome-700">{review.name}</h3>
                      </div>
                      <div className="relative">
                        <p className="text-gray-700 text-base leading-relaxed italic text-left">
                          <span className="text-tatryhome-700 text-xl font-serif mr-1">"</span>
                          {review.comment}
                          <span className="text-tatryhome-700 text-xl font-serif ml-1">"</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Short reviews - small boxes clustered together */}
              <div className="flex flex-wrap justify-center">
                {short.map((review, index) => (
                  <div 
                    key={`short-${index}`} 
                    className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1"
                    style={{ transform: `translateY(${(index % 3 - 1) * 5}px)` }}
                  >
                    <div className="bg-white p-3 rounded-md shadow-sm hover:shadow transition-shadow duration-200 border border-gray-100 h-full flex flex-col justify-center">
                      <div className="flex items-center mb-1">
                        <div className="w-5 h-5 bg-tatryhome-50 rounded-full flex items-center justify-center text-tatryhome-700 text-xs font-semibold mr-1 flex-shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <h3 className="font-medium text-xs text-tatryhome-700">{review.name}</h3>
                      </div>
                      <div className="relative">
                        <p className="text-gray-700 text-base leading-relaxed italic text-left">
                          <span className="text-tatryhome-700 text-xl font-serif mr-1">"</span>
                          {review.comment}
                          <span className="text-tatryhome-700 text-xl font-serif ml-1">"</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews; 