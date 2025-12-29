import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
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
      className="glass-card rounded-2xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
    >
      {/* Cover Image */}
      <div className="aspect-video w-full">
        {university.image ? (
          <img 
            src={university.image} 
            alt={language === 'ru' ? university.nameRu : university.nameKz}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-muted to-muted/50" />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Title */}
        <h3 className="font-semibold text-foreground text-base leading-tight line-clamp-2">
          {language === 'ru' ? university.nameRu : university.nameKz}
        </h3>

        {/* Info row with city, type and grant badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{university.city}</span>
          </div>
          <Badge variant="outline" className={`text-xs ${typeColors[university.type]}`}>
            {typeLabels[university.type]}
          </Badge>
          <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
            {t.grant} {university.minGrantScore}
          </Badge>
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
      </div>
    </motion.div>
  );
};

export default UniversityCard;
