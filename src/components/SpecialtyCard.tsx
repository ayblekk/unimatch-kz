import { motion } from 'framer-motion';
import { GraduationCap, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Specialty } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

interface SpecialtyCardProps {
  specialty: Specialty;
  userScore: number;
  index: number;
}

const SpecialtyCard = ({ specialty, userScore, index }: SpecialtyCardProps) => {
  const { language, t } = useLanguage();

  const getName = () =>
    language === 'ru' ? specialty.nameRu : specialty.nameKz;
  const getUniversity = () =>
    language === 'ru' ? specialty.universityRu : specialty.universityKz;

  const threshold = specialty.threshold2024;
  const scoreDiff = userScore - threshold;
  const progressPercent = Math.min(Math.max((userScore / threshold) * 100, 0), 100);

  const getChanceLevel = () => {
    if (scoreDiff >= 5) return 'high';
    if (scoreDiff >= -5) return 'medium';
    return 'low';
  };

  const chanceLevel = getChanceLevel();

  const getChanceLabel = () => {
    switch (chanceLevel) {
      case 'high':
        return t.highChance;
      case 'medium':
        return t.mediumChance;
      case 'low':
        return t.lowChance;
    }
  };

  const getChanceClass = () => {
    switch (chanceLevel) {
      case 'high':
        return 'chance-high';
      case 'medium':
        return 'chance-medium';
      case 'low':
        return 'chance-low';
    }
  };

  const getProgressColor = () => {
    switch (chanceLevel) {
      case 'high':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'low':
        return 'bg-destructive';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded-md bg-secondary text-xs font-mono font-medium text-secondary-foreground mb-1">
              {specialty.code}
            </span>
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {getName()}
            </h3>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getChanceClass()}`}
        >
          {getChanceLabel()}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {getUniversity()}
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t.yourScore}</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">{userScore}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">
              {threshold} {t.threshold}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: 'easeOut' }}
              className={`h-full rounded-full ${getProgressColor()}`}
            />
          </div>
          {progressPercent >= 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
              className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-success flex items-center justify-center"
            >
              <svg
                className="w-2.5 h-2.5 text-success-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>
              {specialty.grants2024} {t.grants}
            </span>
          </div>
          <span className="text-xs px-2 py-1 rounded-lg bg-secondary text-secondary-foreground capitalize">
            {specialty.type === 'national' && (language === 'ru' ? 'Национальный' : 'Ұлттық')}
            {specialty.type === 'state' && (language === 'ru' ? 'Государственный' : 'Мемлекеттік')}
            {specialty.type === 'private' && (language === 'ru' ? 'Частный' : 'Жеке')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialtyCard;
