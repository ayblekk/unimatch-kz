import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const EmptyState = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6"
      >
        <SearchX className="w-12 h-12 text-muted-foreground" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-foreground mb-2 text-center"
      >
        {t.noResults}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-center max-w-sm"
      >
        {t.noResultsDescription}
      </motion.p>
    </motion.div>
  );
};

export default EmptyState;
