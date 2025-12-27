import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profileSubjects } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HeroCardProps {
  score: number;
  setScore: (score: number) => void;
  subject1: string;
  setSubject1: (subject: string) => void;
  subject2: string;
  setSubject2: (subject: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const HeroCard = ({
  score,
  setScore,
  subject1,
  setSubject1,
  subject2,
  setSubject2,
  onSearch,
  isLoading,
}: HeroCardProps) => {
  const { language, t } = useLanguage();

  const getSubjectName = (subject: { nameRu: string; nameKz: string }) => {
    return language === 'ru' ? subject.nameRu : subject.nameKz;
  };

  const filteredSubjects2 = profileSubjects.filter(
    (s) => s.nameRu !== subject1
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-card rounded-3xl p-6 md:p-8 mx-4 md:mx-0"
    >
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-2"
        >
          {t.subtitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-sm md:text-base max-w-md mx-auto"
        >
          {t.description}
        </motion.p>
      </div>

      <div className="space-y-6">
        {/* ENT Score */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-foreground mb-4">
            {t.entScore}
          </label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl md:text-5xl font-bold text-primary">
                {score}
              </span>
              <span className="text-muted-foreground">/ 140 {t.points}</span>
            </div>
            <Slider
              value={[score]}
              onValueChange={(value) => setScore(value[0])}
              min={0}
              max={140}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>70</span>
              <span>140</span>
            </div>
          </div>
        </motion.div>

        {/* Subject Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.subject1}
            </label>
            <Select value={subject1} onValueChange={setSubject1}>
              <SelectTrigger className="w-full h-12 rounded-xl bg-secondary/50 border-border/50">
                <SelectValue placeholder={t.selectSubject} />
              </SelectTrigger>
              <SelectContent className="bg-popover rounded-xl border-border">
                {profileSubjects.map((subject) => (
                  <SelectItem
                    key={subject.id}
                    value={subject.nameRu}
                    className="rounded-lg"
                  >
                    {getSubjectName(subject)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.subject2}
            </label>
            <Select value={subject2} onValueChange={setSubject2}>
              <SelectTrigger className="w-full h-12 rounded-xl bg-secondary/50 border-border/50">
                <SelectValue placeholder={t.selectSubject} />
              </SelectTrigger>
              <SelectContent className="bg-popover rounded-xl border-border">
                {filteredSubjects2.map((subject) => (
                  <SelectItem
                    key={subject.id}
                    value={subject.nameRu}
                    className="rounded-lg"
                  >
                    {getSubjectName(subject)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        {/* Search Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onSearch}
            disabled={!subject1 || !subject2 || isLoading}
            className="w-full h-14 rounded-2xl text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground pulse-animation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Search className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                {t.search}
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroCard;
