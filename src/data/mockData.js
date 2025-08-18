// بيانات تجريبية للدورات
export const mockCourses = [
  {
    id: 1,
    title: "التسويق الرقمي المتقدم",
    rating: 4.7,
    students: 3120,
    duration: 52,
    thumbnail: "https://placehold.co/600x400?text=تسويق+رقمي",
    description: "تعلم استراتيجيات التسويق الرقمي الحديثة ووسائل التواصل الاجتماعي.",
    category: "التسويق",
    trainerId: 3,
    trainerName: "أحمدtrainer",
    levels: [
      {
        id: 1,
        name: "المقدمة في التسويق الرقمي",
        isUnlocked: true,
        videos: [
          {
            id: 1,
            title: "مقدمة عن التسويق الرقمي",
            description: "تعرف على مفاهيم التسويق الرقمي وأهميته في العصر الحديث",
            youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: 2,
            title: "أنواع التسويق الرقمي",
            description: "استكشف مختلف أنواع التسويق الرقمي وأساليب التطبيق",
            youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ],
        quiz: {
          questions: [
            {
              id: 1,
              question: "ما هو التسويق الرقمي؟",
              options: ["استخدام الإنترنت للتسويق", "التسويق عبر الرسائل النصية فقط", "التسويق عبر البريد الإلكتروني فقط"],
              correctAnswer: 0
            },
            {
              id: 2,
              question: "أي من التالي ليس من أدوات التسويق الرقمي؟",
              options: ["وسائل التواصل الاجتماعي", "الإعلانات التقليدية", "البريد الإلكتروني"],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 2,
        name: "التسويق عبر وسائل التواصل الاجتماعي",
        isUnlocked: false,
        videos: [],
        quiz: null
      }
    ]
  },
  {
    id: 2,
    title: "تطوير تطبيقات الويب",
    rating: 4.9,
    students: 2840,
    duration: 75,
    thumbnail: "https://placehold.co/600x400?text=تطوير+ويب",
    description: "احترف تطوير تطبيقات الويب باستخدام أحدث التقنيات والأدوات.",
    category: "البرمجة",
    trainerId: 3,
    trainerName: "أحمدtrainer",
    levels: [
      {
        id: 1,
        name: "أساسيات تطوير الويب",
        isUnlocked: true,
        videos: [
          {
            id: 1,
            title: "مقدمة في تطوير الويب",
            description: "تعرف على أساسيات تطوير الويب وأهم اللغات المستخدمة",
            youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ],
        quiz: {
          questions: [
            {
              id: 1,
              question: "أي من اللغات التالية تُستخدم لتصميم صفحات الويب؟",
              options: ["JavaScript", "HTML", "Python"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  }
];

// بيانات تجريبية للمستخدمين
export const mockUsers = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "student",
    enrolledCourses: [1],
    completedCourses: [],
    progress: 65
  },
  {
    id: 2,
    name: "فاطمة علي",
    email: "fatima@example.com",
    role: "student",
    enrolledCourses: [2],
    completedCourses: [1],
    progress: 80
  },
  {
    id: 3,
    name: "أحمدtrainer",
    email: "ahmad@gmail.com",
    role: "trainer",
    courses: [1, 2]
  },
  {
    id: 4,
    name: "مدير النظام",
    email: "admin@gmail.com",
    role: "admin"
  }
];

// دالة لتوليد رمز تحقق عشوائي
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// دالة للتحقق من صحة البريد الإلكتروني
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// دالة للتحقق من قوة كلمة المرور
export const validatePassword = (password) => {
  return password.length >= 6;
};