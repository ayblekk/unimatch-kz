import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass-card border-b border-border/50"
    >
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-foreground">{t.title}</span>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-full bg-secondary">
          <button
            onClick={() => setLanguage('ru')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              language === 'ru'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            RU
          </button>
          <button
            onClick={() => setLanguage('kz')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              language === 'kz'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            ҚЗ
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
