import grantsData from './grants.json';

export interface Specialty {
  id: string;
  code: string;
  nameRu: string;
  nameKz: string;
  universityRu: string;
  universityKz: string;
  city: string;
  type: 'national' | 'state' | 'private';
  threshold2024: number;
  grants2024: number;
  profileSubjects: [string, string];
}

// Загружаем данные из JSON файла
export const specialties: Specialty[] = grantsData.specialties as Specialty[];
export const cities = grantsData.cities;
export const universityTypes = grantsData.universityTypes;
export const profileSubjects = grantsData.profileSubjects;

export type Language = 'ru' | 'kz';

export const translations = {
  ru: {
    title: 'UniSelector KZ',
    subtitle: 'Рассчитайте свои шансы на поступление',
    description: 'Узнайте, в какие университеты Казахстана вы можете поступить на грант по результатам ЕНТ 2024/2025',
    entScore: 'Ваш балл ЕНТ',
    points: 'баллов',
    subject1: 'Профильный предмет 1',
    subject2: 'Профильный предмет 2',
    selectSubject: 'Выберите предмет',
    search: 'Найти специальности',
    searching: 'Поиск...',
    filters: 'Фильтры',
    results: 'Результаты',
    found: 'Найдено специальностей',
    threshold: 'Проходной балл',
    grants: 'грантов',
    highChance: 'Высокий шанс',
    lowChance: 'Мало шансов',
    noResults: 'Специальности не найдены',
    noResultsDescription: 'Попробуйте изменить параметры поиска или выбрать другие предметы',
    yourScore: 'Ваш балл',
  },
  kz: {
    title: 'UniSelector KZ',
    subtitle: 'Түсу мүмкіндігіңізді есептеңіз',
    description: 'ҰБТ 2024/2025 нәтижелері бойынша Қазақстанның қай университеттеріне грантпен түсе алатыныңызды біліңіз',
    entScore: 'Сіздің ҰБТ балыңыз',
    points: 'балл',
    subject1: 'Бейіндік пән 1',
    subject2: 'Бейіндік пән 2',
    selectSubject: 'Пәнді таңдаңыз',
    search: 'Мамандықтарды табу',
    searching: 'Іздеу...',
    filters: 'Сүзгілер',
    results: 'Нәтижелер',
    found: 'Мамандық табылды',
    threshold: 'Өту балы',
    grants: 'грант',
    highChance: 'Жоғары мүмкіндік',
    lowChance: 'Аз мүмкіндік',
    noResults: 'Мамандықтар табылмады',
    noResultsDescription: 'Іздеу параметрлерін өзгертіп көріңіз немесе басқа пәндерді таңдаңыз',
    yourScore: 'Сіздің балыңыз',
  },
};
