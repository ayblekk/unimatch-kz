import { motion } from 'framer-motion';
import { MapPin, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { University, universityTranslations } from '@/data/universities';
import { useLanguage } from '@/contexts/LanguageContext';

interface UniversityCardProps {
  university: University;
  index: number;
}

const UniversityCard = ({ university, index }: UniversityCardProps) => {
  const { language } = useLanguage();
  const t = universityTranslations[language];

  const typeLabels = {
    national: t.national,
    state: t.state,
    private: t.private
  };

  const typeColors = {
    national: 'bg-primary/10 text-primary border-primary/20',
    state: 'bg-success/10 text-success border-success/20',
    private: 'bg-warning/10 text-warning border-warning/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-card rounded-2xl p-5 flex flex-col gap-4 transition-shadow duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground text-base leading-tight truncate">
            {language === 'ru' ? university.nameRu : university.nameKz}
          </h3>
        </div>
      </div>

      {/* Info row */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4" />
          <span>{university.city}</span>
        </div>
        <Badge variant="outline" className={`text-xs ${typeColors[university.type]}`}>
          {typeLabels[university.type]}
        </Badge>
      </div>

      {/* Score badge */}
      <div className="bg-success/10 border border-success/20 rounded-xl px-4 py-2.5">
        <p className="text-success font-semibold text-sm">
          {t.minScore}: от {university.minGrantScore} {t.points}
        </p>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-1.5">
        {university.specialties.map((specialty) => (
          <Badge 
            key={specialty} 
            variant="secondary" 
            className="text-xs font-normal"
          >
            {specialty}
          </Badge>
        ))}
      </div>

      {/* Button */}
      <Button variant="outline" className="w-full mt-auto">
        {t.learnMore}
      </Button>
    </motion.div>
  );
};

export default UniversityCard;
