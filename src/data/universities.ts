import kaznuImage from '@/assets/universities/kaznu.jpg';

export interface University {
  id: string;
  nameRu: string;
  nameKz: string;
  city: string;
  type: 'national' | 'state' | 'private';
  minGrantScore: number;
  specialties: string[];
  image?: string;
}

export const universities: University[] = [
  {
    id: '1',
    nameRu: 'КазНУ им. аль-Фараби',
    nameKz: 'Әл-Фараби атындағы ҚазҰУ',
    city: 'Алматы',
    type: 'national',
    minGrantScore: 85,
    specialties: ['IT & Engineering', 'Medicine', 'Law', 'Economics'],
    image: kaznuImage
  },
  {
    id: '2',
    nameRu: 'Satbayev University',
    nameKz: 'Satbayev University',
    city: 'Алматы',
    type: 'national',
    minGrantScore: 90,
    specialties: ['IT & Engineering', 'Oil & Gas', 'Mining', 'Architecture']
  },
  {
    id: '3',
    nameRu: 'KBTU',
    nameKz: 'KBTU',
    city: 'Алматы',
    type: 'private',
    minGrantScore: 95,
    specialties: ['IT & Engineering', 'Business', 'Energy']
  },
  {
    id: '4',
    nameRu: 'Astana IT University',
    nameKz: 'Astana IT University',
    city: 'Астана',
    type: 'private',
    minGrantScore: 92,
    specialties: ['IT & Engineering', 'Data Science', 'Cybersecurity']
  },
  {
    id: '5',
    nameRu: 'Назарбаев Университет',
    nameKz: 'Назарбаев Университеті',
    city: 'Астана',
    type: 'national',
    minGrantScore: 120,
    specialties: ['IT & Engineering', 'Medicine', 'Business', 'Sciences']
  },
  {
    id: '6',
    nameRu: 'SDU University',
    nameKz: 'SDU University',
    city: 'Алматы',
    type: 'private',
    minGrantScore: 88,
    specialties: ['IT & Engineering', 'Business', 'Law', 'Media']
  },
  {
    id: '7',
    nameRu: 'ЕНУ им. Гумилёва',
    nameKz: 'Л.Н. Гумилев атындағы ЕҰУ',
    city: 'Астана',
    type: 'national',
    minGrantScore: 80,
    specialties: ['Humanities', 'Sciences', 'Law', 'Economics']
  },
  {
    id: '8',
    nameRu: 'КарУ им. Букетова',
    nameKz: 'Е.А.Бөкетов атындағы ҚарУ',
    city: 'Караганда',
    type: 'state',
    minGrantScore: 70,
    specialties: ['Pedagogy', 'Medicine', 'Engineering', 'Economics']
  }
];

export const universityTranslations = {
  ru: {
    sectionTitle: 'Университеты Казахстана',
    sectionSubtitle: 'Полный каталог вузов с проходными баллами и специальностями',
    grant: 'Грант: от',
    learnMore: 'Подробнее',
    national: 'Национальный',
    state: 'Государственный',
    private: 'Частный'
  },
  kz: {
    sectionTitle: 'Қазақстан университеттері',
    sectionSubtitle: 'Өту балдары мен мамандықтары бар жоғары оқу орындарының толық каталогы',
    grant: 'Грант: ',
    learnMore: 'Толығырақ',
    national: 'Ұлттық',
    state: 'Мемлекеттік',
    private: 'Жеке'
  }
};
