import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cities, universityTypes } from '@/data/mockData';

interface FilterBarProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const FilterBar = ({
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
}: FilterBarProps) => {
  const { language, t } = useLanguage();

  const getName = (item: { nameRu: string; nameKz: string }) => {
    return language === 'ru' ? item.nameRu : item.nameKz;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="px-4 md:px-0"
    >
      <p className="text-sm font-medium text-muted-foreground mb-3">
        {t.filters}
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* City Filters */}
        {cities.map((city) => (
          <motion.button
            key={city.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCity(city.id)}
            className={`filter-chip whitespace-nowrap ${
              selectedCity === city.id ? 'filter-chip-active' : ''
            }`}
          >
            {getName(city)}
          </motion.button>
        ))}
        
        <div className="w-px h-8 bg-border mx-1 flex-shrink-0" />
        
        {/* Type Filters */}
        {universityTypes.map((type) => (
          <motion.button
            key={type.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedType(type.id)}
            className={`filter-chip whitespace-nowrap ${
              selectedType === type.id ? 'filter-chip-active' : ''
            }`}
          >
            {getName(type)}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterBar;
