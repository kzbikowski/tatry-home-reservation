import { PhoneCall, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/lib/i18n';

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mountain-800 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="p-3 bg-tatryhome-100 rounded-full text-tatryhome-700 mr-4">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-mountain-800 mb-1">{t('contact.phone')}</h3>
                <p className="text-gray-700">{t('contact.phoneNumber')}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 bg-tatryhome-100 rounded-full text-tatryhome-700 mr-4">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-mountain-800 mb-1">{t('contact.email')}</h3>
                <p className="text-gray-700">{t('contact.emailAddress')}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 bg-tatryhome-100 rounded-full text-tatryhome-700 mr-4">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-mountain-800 mb-1">{t('contact.location')}</h3>
                <p className="text-gray-700">{t('contact.address')}</p>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href="https://www.booking.com/hotel/pl/tatry-home.pl.html" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-tatryhome-700 text-tatryhome-700 hover:bg-tatryhome-50">
                  {t('contact.bookingCom')}
                </Button>
              </a>
            </div>
          </div>

          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d656.2051522382183!2d19.86510449999999!3d49.29317669999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715ed0162b25e0b%3A0x92c6f7015fdbd0f6!2sTatry%20Home!5e0!3m2!1sen!2spl!4v1714398711459!5m2!1sen!2spl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tatry Home Location"
              aria-label="Map showing Tatry Home in Kościelisko"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
