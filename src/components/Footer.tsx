import { Home } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-mountain-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Home className="h-5 w-5" />
            <span className="font-bold text-lg text-white">Tatry Home</span>
          </div>
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
