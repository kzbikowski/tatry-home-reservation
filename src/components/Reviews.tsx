import { Star } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

// Reviews data (Polish version - original)
const plReviews = [
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

// Translations of Polish reviews to English
const enReviews = [
  {
    name: "Irepry",
    comment: "Beautiful cottage in a lovely setting - a small gated community with a porter at the entrance, surrounded by mountains and wonderful views. Clean and well-decorated. Everything you need is there, even a dishwasher, washing machine, and microwave. Close to hiking trails and Zakopane itself if you have a car. The peace and beautiful views make you wish you could wake up there every day. It was sad to leave... we'll definitely return someday."
  },
  {
    name: "Wojciech",
    comment: "Apartment located in a gated area among several stylish houses. The property is well-maintained and very clean. The 8-person accommodations are spacious and comfortable."
  },
  {
    name: "Marta",
    comment: "Very spacious and modern apartment, excellently equipped. We visited with friends, a place worth recommending, great service. The owner was nice and helpful."
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
    comment: "Very comfortable, convenient, spacious interiors; a very special place for family where everyone found their own corner. Amazing evenings by the fireplace. Good starting point to visit other places. Designated parking space. Good contact with the owner and staff. Beautiful views from the window. I highly recommend this place."
  },
  {
    name: "Marta",
    comment: "Spacious apartment for the whole family, very clean, everything you need on site. Washing machine, dishwasher. Comfortable beds, beautiful views. Plus for parking and nice gentlemen at the entrance."
  },
  {
    name: "Dorota",
    comment: "Beautiful view. Great location. Very open and communicative owner."
  },
  {
    name: "Robert",
    comment: "Another successful stay at this location, away from noise and tourist crowds. I recommend it to the undecided. You will keep coming back."
  },
  {
    name: "Ewelina",
    comment: "Wonderful new house in highland style, away from the hustle and bustle. Beautiful panorama of the Tatra Mountains from the windows. Convenient location, close to Chochołowska and Kościeliska Valley."
  }
];

// Translations of Polish reviews to German
const deReviews = [
  {
    name: "Irepry",
    comment: "Schönes Ferienhaus in einer wunderschönen Umgebung - eine kleine Wohnsiedlung mit Tor und Portier am Eingang, umgeben von Bergen und herrlichem Ausblick. Sauberkeit und Einrichtung sind ein Plus. Alles Notwendige ist vorhanden, sogar Geschirrspüler, Waschmaschine und Mikrowelle. Nahe zu Wanderwegen und zu Zakopane selbst, wenn man ein Auto hat. Die Ruhe und die schönen Ausblicke lassen einen wünschen, jeden Tag dort aufzuwachen. Es war traurig, abzureisen... wir werden sicher irgendwann zurückkehren."
  },
  {
    name: "Wojciech",
    comment: "Apartment in einem geschlossenen Bereich zwischen mehreren stilvollen Häusern gelegen. Das Objekt ist gepflegt und sehr sauber. Die 8-Personen-Unterkunft ist geräumig und komfortabel."
  },
  {
    name: "Marta",
    comment: "Sehr geräumige und moderne Wohnung, hervorragend ausgestattet. Wir waren mit Freunden dort, ein empfehlenswerter Ort, toller Service. Der Eigentümer war nett und hilfsbereit."
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
    comment: "Sehr komfortable, bequeme, geräumige Innenräume; ein besonderer Ort für Familien, an dem jeder seine eigene Ecke findet. Wundervolle Abende am Kamin. Guter Ausgangspunkt, um andere Orte zu besuchen. Zugewiesener Parkplatz. Guter Kontakt zum Eigentümer und Personal. Schöne Aussicht aus dem Fenster. Ich empfehle diesen Ort sehr."
  },
  {
    name: "Marta",
    comment: "Geräumige Wohnung für die ganze Familie, sehr sauber, alles was man braucht vor Ort. Waschmaschine, Geschirrspüler. Bequeme Betten, schöne Aussicht. Pluspunkt für Parkplatz und nette Herren am Eingang."
  },
  {
    name: "Dorota",
    comment: "Wunderschöne Aussicht. Tolle Lage. Sehr offener und kommunikativer Eigentümer."
  },
  {
    name: "Robert",
    comment: "Ein weiterer erfolgreicher Aufenthalt an diesem Ort, fernab von Lärm und Touristenmassen. Ich empfehle es den Unentschlossenen. Sie werden immer wieder zurückkommen."
  },
  {
    name: "Ewelina",
    comment: "Wunderbares neues Haus im Gebirgsstil, abseits vom Trubel. Wunderschönes Panorama der Tatra-Berge von den Fenstern aus. Günstige Lage, nahe dem Chochołowska- und Kościeliska-Tal."
  }
];

// Helper function to categorize reviews by length
const categorizeReviews = (reviewsData) => {
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
  const { t, language } = useLanguage();
  
  // Select the appropriate reviews based on language
  let reviewsData;
  switch (language) {
    case 'en':
      reviewsData = enReviews;
      break;
    case 'de':
      reviewsData = deReviews;
      break;
    default:
      reviewsData = plReviews;
  }
  
  const { long, medium, short } = categorizeReviews(reviewsData);
  
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