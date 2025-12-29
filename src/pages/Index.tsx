import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { specialties, Specialty } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { isCreativeExam } from '@/data/subjectCombinations';
import Header from '@/components/Header';
import HeroCard from '@/components/HeroCard';
import FilterBar from '@/components/FilterBar';
import ResultsSection from '@/components/ResultsSection';
import UniversitiesSection from '@/components/UniversitiesSection';

const IndexContent = () => {
  const { language } = useLanguage();
  const [score, setScore] = useState(100);
  const [subject1, setSubject1] = useState('');
  const [subject2, setSubject2] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [results, setResults] = useState<Specialty[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(() => {
    const isCreative = isCreativeExam(subject1);
    
    // Debug logging
    console.log('🔍 Search triggered:', { 
      score, 
      subject1, 
      subject2, 
      isCreative,
      selectedCity, 
      selectedType 
    });

    // Validation
    if (!subject1 || (!isCreative && !subject2)) {
      console.log('❌ Validation failed: missing subjects');
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Қате',
        description: language === 'ru' 
          ? 'Пожалуйста, введите балл и выберите предметы' 
          : 'Балды енгізіп, пәндерді таңдаңыз',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const filtered = specialties.filter((specialty) => {
        // Check if subjects match - for creative exams, only check subject1
        const subjectsMatch = isCreative
          ? specialty.profileSubjects.includes(subject1)
          : specialty.profileSubjects.includes(subject1) &&
            specialty.profileSubjects.includes(subject2);

        // Check city filter
        const cityMatch =
          selectedCity === 'all' || specialty.city === selectedCity;

        // Check type filter
        const typeMatch =
          selectedType === 'all' || specialty.type === selectedType;

        return subjectsMatch && cityMatch && typeMatch;
      });

      // Sort by threshold (higher threshold = harder to get in)
      filtered.sort((a, b) => b.threshold2024 - a.threshold2024);

      console.log('✅ Search results:', { count: filtered.length, results: filtered });

      setResults(filtered);
      setIsLoading(false);

      // Scroll to results after search
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 800);
  }, [score, subject1, subject2, selectedCity, selectedType, language]);

  // Re-filter when filters change (if already searched)
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (hasSearched && subject1 && subject2) {
      setIsLoading(true);
      setTimeout(() => {
        const filtered = specialties.filter((specialty) => {
          const subjectsMatch =
            specialty.profileSubjects.includes(subject1) &&
            specialty.profileSubjects.includes(subject2);
          const cityMatch = city === 'all' || specialty.city === city;
          const typeMatch =
            selectedType === 'all' || specialty.type === selectedType;
          return subjectsMatch && cityMatch && typeMatch;
        });
        filtered.sort((a, b) => b.threshold2024 - a.threshold2024);
        setResults(filtered);
        setIsLoading(false);
      }, 300);
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (hasSearched && subject1 && subject2) {
      setIsLoading(true);
      setTimeout(() => {
        const filtered = specialties.filter((specialty) => {
          const subjectsMatch =
            specialty.profileSubjects.includes(subject1) &&
            specialty.profileSubjects.includes(subject2);
          const cityMatch =
            selectedCity === 'all' || specialty.city === selectedCity;
          const typeMatch = type === 'all' || specialty.type === type;
          return subjectsMatch && cityMatch && typeMatch;
        });
        filtered.sort((a, b) => b.threshold2024 - a.threshold2024);
        setResults(filtered);
        setIsLoading(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen pb-8">
      <Header />

      <main className="container max-w-4xl mx-auto pt-6 md:pt-10 space-y-8">
        <HeroCard
          score={score}
          setScore={setScore}
          subject1={subject1}
          setSubject1={setSubject1}
          subject2={subject2}
          setSubject2={setSubject2}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Results Section - appears after search, before Universities */}
        {hasSearched && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <FilterBar
              selectedCity={selectedCity}
              setSelectedCity={handleCityChange}
              selectedType={selectedType}
              setSelectedType={handleTypeChange}
            />

            <ResultsSection
              results={results}
              userScore={score}
              isLoading={isLoading}
              hasSearched={hasSearched}
            />
          </motion.div>
        )}
      </main>

      <UniversitiesSection />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 py-6 text-center text-sm text-muted-foreground"
      >
        <p>© 2024 UniSelector KZ. Данные ЕНТ 2024/2025</p>
      </motion.footer>
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
