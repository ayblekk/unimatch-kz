import { motion } from 'framer-motion';
import { universities, universityTranslations } from '@/data/universities';
import { useLanguage } from '@/contexts/LanguageContext';
import UniversityCard from './UniversityCard';

const UniversitiesSection = () => {
  const { language } = useLanguage();
  const t = universityTranslations[language];

  return (
    <section className="container max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          {t.sectionTitle}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          {t.sectionSubtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((university, index) => (
          <UniversityCard 
            key={university.id} 
            university={university} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
};

export default UniversitiesSection;
