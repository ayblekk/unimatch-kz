// Valid ENT subject combinations with their associated specialties
export interface SubjectCombination {
  subject1: string;
  subject1Kz: string;
  subject2: string;
  subject2Kz: string;
  specialties: string[];
  specialtiesKz: string[];
}

export const VALID_COMBINATIONS: SubjectCombination[] = [
  {
    subject1: "Математика",
    subject1Kz: "Математика",
    subject2: "Физика",
    subject2Kz: "Физика",
    specialties: ["IT", "Инженерия", "Строительство"],
    specialtiesKz: ["IT", "Инженерия", "Құрылыс"],
  },
  {
    subject1: "Математика",
    subject1Kz: "Математика",
    subject2: "География",
    subject2Kz: "География",
    specialties: ["Экономика", "Менеджмент", "Аудит"],
    specialtiesKz: ["Экономика", "Менеджмент", "Аудит"],
  },
  {
    subject1: "Математика",
    subject1Kz: "Математика",
    subject2: "Иностранный язык",
    subject2Kz: "Шет тілі",
    specialties: ["Бизнес-аналитика", "IT в образовании"],
    specialtiesKz: ["Бизнес-аналитика", "Білім берудегі IT"],
  },
  {
    subject1: "Биология",
    subject1Kz: "Биология",
    subject2: "Химия",
    subject2Kz: "Химия",
    specialties: ["Медицина", "Стоматология", "Фармация"],
    specialtiesKz: ["Медицина", "Стоматология", "Фармация"],
  },
  {
    subject1: "Биология",
    subject1Kz: "Биология",
    subject2: "География",
    subject2Kz: "География",
    specialties: ["Экология", "Почвоведение"],
    specialtiesKz: ["Экология", "Топырақтану"],
  },
  {
    subject1: "Всемирная история",
    subject1Kz: "Дүниежүзі тарихы",
    subject2: "География",
    subject2Kz: "География",
    specialties: ["Международные отношения", "Туризм"],
    specialtiesKz: ["Халықаралық қатынастар", "Туризм"],
  },
  {
    subject1: "Всемирная история",
    subject1Kz: "Дүниежүзі тарихы",
    subject2: "Основы права",
    subject2Kz: "Құқық негіздері",
    specialties: ["Юриспруденция", "Право"],
    specialtiesKz: ["Құқықтану", "Құқық"],
  },
  {
    subject1: "Иностранный язык",
    subject1Kz: "Шет тілі",
    subject2: "Всемирная история",
    subject2Kz: "Дүниежүзі тарихы",
    specialties: ["Переводческое дело", "Дипломатия"],
    specialtiesKz: ["Аударма ісі", "Дипломатия"],
  },
  {
    subject1: "Иностранный язык",
    subject1Kz: "Шет тілі",
    subject2: "География",
    subject2Kz: "География",
    specialties: ["Учитель ИЯ", "Гостиничный бизнес"],
    specialtiesKz: ["Шет тілі мұғалімі", "Қонақ үй бизнесі"],
  },
  {
    subject1: "Казахский/Русский язык",
    subject1Kz: "Қазақ/Орыс тілі",
    subject2: "Литература",
    subject2Kz: "Әдебиет",
    specialties: ["Журналистика", "Филология"],
    specialtiesKz: ["Журналистика", "Филология"],
  },
  {
    subject1: "Химия",
    subject1Kz: "Химия",
    subject2: "Физика",
    subject2Kz: "Физика",
    specialties: ["Нефтехимия", "Химическая технология"],
    specialtiesKz: ["Мұнай химиясы", "Химиялық технология"],
  },
  {
    subject1: "Творческий экзамен",
    subject1Kz: "Шығармашылық емтихан",
    subject2: "none",
    subject2Kz: "none",
    specialties: ["Дизайн", "Музыка", "Спорт", "Журналистика"],
    specialtiesKz: ["Дизайн", "Музыка", "Спорт", "Журналистика"],
  },
];

// Get all unique primary subjects (Subject 1)
export const getPrimarySubjects = (): { nameRu: string; nameKz: string }[] => {
  const uniqueSubjects = new Map<string, { nameRu: string; nameKz: string }>();
  
  VALID_COMBINATIONS.forEach((combo) => {
    if (!uniqueSubjects.has(combo.subject1)) {
      uniqueSubjects.set(combo.subject1, {
        nameRu: combo.subject1,
        nameKz: combo.subject1Kz,
      });
    }
  });
  
  return Array.from(uniqueSubjects.values());
};

// Get valid secondary subjects based on selected primary subject
export const getSecondarySubjects = (
  primarySubject: string
): { nameRu: string; nameKz: string; specialties: string[]; specialtiesKz: string[] }[] => {
  if (!primarySubject) return [];
  
  // Handle creative exam case
  if (primarySubject === "Творческий экзамен") {
    return [];
  }
  
  const validCombos = VALID_COMBINATIONS.filter(
    (combo) => combo.subject1 === primarySubject
  );
  
  return validCombos.map((combo) => ({
    nameRu: combo.subject2,
    nameKz: combo.subject2Kz,
    specialties: combo.specialties,
    specialtiesKz: combo.specialtiesKz,
  }));
};

// Check if a subject is a creative exam
export const isCreativeExam = (subject: string): boolean => {
  return subject === "Творческий экзамен";
};

// Get specialties hint for a combination
export const getSpecialtiesHint = (
  subject1: string,
  subject2: string,
  language: 'ru' | 'kz'
): string[] => {
  const combo = VALID_COMBINATIONS.find(
    (c) => c.subject1 === subject1 && c.subject2 === subject2
  );
  
  if (!combo) return [];
  return language === 'ru' ? combo.specialties : combo.specialtiesKz;
};
