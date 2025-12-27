import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Specialty } from '@/data/mockData';
import SpecialtyCard from './SpecialtyCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';

interface ResultsSectionProps {
  results: Specialty[];
  userScore: number;
  isLoading: boolean;
  hasSearched: boolean;
}

const ResultsSection = ({
  results,
  userScore,
  isLoading,
  hasSearched,
}: ResultsSectionProps) => {
  const { t } = useLanguage();

  if (!hasSearched) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 md:px-0"
    >
      {!isLoading && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <h2 className="text-lg font-semibold text-foreground">
            {t.results}
          </h2>
          <span className="text-sm text-muted-foreground">
            {t.found}: {results.length}
          </span>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </motion.div>
        ) : results.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {results.map((specialty, index) => (
              <SpecialtyCard
                key={specialty.id}
                specialty={specialty}
                userScore={userScore}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmptyState />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResultsSection;
