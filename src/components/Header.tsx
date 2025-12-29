import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import logo from '@/assets/logo.png';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-card border-b border-border/30 shadow-sm' 
          : 'glass-card border-b border-border/50'
      }`}
    >
      <motion.div 
        className="container flex items-center justify-between px-4 overflow-hidden"
        animate={{ 
          height: isScrolled ? '52px' : '104px',
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="UniSelector KZ" 
            className="h-[88px] w-auto object-contain transition-all duration-300"
            style={{ 
              filter: theme === 'light' ? 'brightness(0)' : 'none' 
            }}
          />
          <span className="text-xl font-bold text-foreground">{t.title}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-primary/10 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </motion.button>

          {/* Language Toggle */}
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
      </motion.div>
    </motion.header>
  );
};

export default Header;
