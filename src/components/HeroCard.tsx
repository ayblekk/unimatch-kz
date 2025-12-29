import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getPrimarySubjects, 
  getSecondarySubjects, 
  isCreativeExam,
  getSpecialtiesHint 
} from '@/data/subjectCombinations';
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

  const primarySubjects = getPrimarySubjects();
  const secondarySubjects = getSecondarySubjects(subject1);
  const isCreative = isCreativeExam(subject1);
  const specialtiesHint = getSpecialtiesHint(subject1, subject2, language);

  // Reset subject2 when subject1 changes
  useEffect(() => {
    if (isCreative) {
      setSubject2('none');
    } else {
      setSubject2('');
    }
  }, [subject1, isCreative, setSubject2]);

  const getSubjectDisplayName = (nameRu: string, nameKz: string) => {
    return language === 'ru' ? nameRu : nameKz;
  };

  const canSearch = subject1 && (isCreative || subject2);

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
          className="text-2xl md:text-4xl font-bold text-foreground mb-3"
        >
          {language === 'ru' 
            ? 'Твой путь к гранту начинается здесь' 
            : 'Грантқа жолың осы жерден басталады'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-sm md:text-lg max-w-lg mx-auto"
        >
          {language === 'ru'
            ? 'Введите ваш балл ЕНТ и выберите профильные предметы — мы покажем, куда вы можете поступить на грант'
            : 'ҰБТ балыңызды енгізіп, бейіндік пәндерді таңдаңыз — грантқа қайда түсе алатыныңызды көрсетеміз'}
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
          {/* Subject 1 - Primary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.subject1}
            </label>
            <Select value={subject1} onValueChange={setSubject1}>
              <SelectTrigger className="w-full h-12 rounded-xl bg-secondary/50 border-border/50 hover:bg-secondary/70 transition-colors">
                <SelectValue placeholder={t.selectSubject} />
              </SelectTrigger>
              <SelectContent className="bg-popover rounded-xl border-border max-h-[300px]">
                {primarySubjects.map((subject) => (
                  <SelectItem
                    key={subject.nameRu}
                    value={subject.nameRu}
                    className="rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {subject.nameRu === "Творческий экзамен" && (
                        <Sparkles className="w-4 h-4 text-primary" />
                      )}
                      {getSubjectDisplayName(subject.nameRu, subject.nameKz)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Subject 2 - Dependent */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.subject2}
            </label>
            <AnimatePresence mode="wait">
              {isCreative ? (
                <motion.div
                  key="creative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center gap-2 text-primary font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  {language === 'ru' ? 'Практический экзамен' : 'Практикалық емтихан'}
                </motion.div>
              ) : (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Select 
                    value={subject2} 
                    onValueChange={setSubject2}
                    disabled={!subject1}
                  >
                    <SelectTrigger 
                      className={`w-full h-12 rounded-xl border-border/50 transition-all ${
                        !subject1 
                          ? 'bg-muted/30 cursor-not-allowed opacity-60' 
                          : 'bg-secondary/50 hover:bg-secondary/70'
                      }`}
                    >
                      <SelectValue 
                        placeholder={
                          !subject1 
                            ? (language === 'ru' ? 'Сначала выберите предмет 1' : 'Алдымен 1-пәнді таңдаңыз')
                            : t.selectSubject
                        } 
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-popover rounded-xl border-border">
                      {secondarySubjects.map((subject) => (
                        <SelectItem
                          key={subject.nameRu}
                          value={subject.nameRu}
                          className="rounded-lg cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span>{getSubjectDisplayName(subject.nameRu, subject.nameKz)}</span>
                            <span className="text-xs text-muted-foreground">
                              {(language === 'ru' ? subject.specialties : subject.specialtiesKz).join(', ')}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Specialties Hint */}
        <AnimatePresence>
          {specialtiesHint.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  {language === 'ru' ? 'Доступные направления:' : 'Қол жетімді бағыттар:'}
                </span>
                {specialtiesHint.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onSearch}
            disabled={!canSearch || isLoading}
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
