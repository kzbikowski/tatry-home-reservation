import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { getImagePath } from '@/lib/utils';

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-mountain-800 mb-6">
              {t('about.title')}
            </h2>
            <p className="text-gray-700 mb-4 text-lg">
              {t('about.description1')}
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              {t('about.description2')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-tatryhome-700 hover:bg-tatryhome-800">
                {t('about.checkAvailability')}
              </Button>
              <Button variant="outline" className="border-tatryhome-700 text-tatryhome-700 hover:bg-tatryhome-50">
                {t('about.learnMore')}
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={getImagePath('images/leaving_room.jpg')}
              alt="Tatry Home Interior" 
              className="rounded-lg shadow-xl object-cover w-full h-[400px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="font-bold text-mountain-800">{t('about.comfortable')}</p>
              <p className="text-gray-600">{t('about.equipped')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
