// src/data/courses.js
export const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'programming', name: 'البرمجة' },
  { id: 'design', name: 'التصميم' },
  { id: 'marketing', name: 'التسويق' },
  { id: 'business', name: 'ريادة الأعمال' },
  { id: 'ai', name: 'الذكاء الاصطناعي' }
];

export const courses= [
  {
    id: 1,
    title: 'التسويق الرقمي المتقدم',
    instructor: 'سارة أحمد',
    level: 'متوسط',
    duration: '52 ساعة',
    students: 3120,
    rating: 4.7,
    image: 'https://placehold.co/400x250?text=تسويق+رقمي',
    category: 'marketing',
    price: 'مجانًا',
    description: 'تعلم استراتيجيات التسويق الرقمي الحديثة، بما في ذلك التسويق عبر وسائل التواصل الاجتماعي، التسويق بالمحتوى، وتحسين محركات البحث (SEO).',
    whatYouWillLearn: [
      'استراتيجيات التسويق عبر وسائل التواصل الاجتماعي',
      'تحسين محركات البحث (SEO)',
      'التسويق بالمحتوى',
      'تحليلات الأداء وقياس العائد'
    ],
    curriculum: [
      { title: 'مقدمة إلى التسويق الرقمي', duration: '2:30' },
      { title: 'استراتيجيات وسائل التواصل الاجتماعي', duration: '4:15' },
      { title: 'تحسين محركات البحث (SEO)', duration: '5:20' },
      { title: 'التسويق بالمحتوى', duration: '3:45' },
      { title: 'تحليلات الأداء', duration: '3:10' }
    ]
  },
  {
    id: 2,
    title: 'تطوير تطبيقات الويب',
    instructor: 'محمد خالد',
    level: 'متقدم',
    duration: '75 ساعة',
    students: 2840,
    rating: 4.9,
    image: 'https://placehold.co/400x250?text=تطوير+ويب',
    category: 'programming',
    price: 'مجانًا',
    description: 'احترف تطوير تطبيقات الويب باستخدام أحدث التقنيات مثل React, Node.js, و MongoDB.',
    whatYouWillLearn: [
      'بناء واجهات مستخدم تفاعلية باستخدام React',
      'تطوير واجهات برمجة التطبيقات (APIs)',
      'استخدام قواعد بيانات NoSQL',
      'نشر التطبيقات على السحابة'
    ],
    curriculum: [
      { title: 'مقدمة إلى تطوير الويب', duration: '3:00' },
      { title: 'HTML5 و CSS3 المتقدم', duration: '5:20' },
      { title: 'JavaScript ES6+', duration: '6:10' },
      { title: 'مقدمة إلى React', duration: '8:00' },
      { title: 'Node.js و Express', duration: '10:30' },
      { title: 'قواعد بيانات MongoDB', duration: '7:40' },
      { title: 'نشر التطبيقات', duration: '4:20' }
    ]
  },
  {
    id: 3,
    title: 'التصميم الجرافيكي الاحترافي',
    instructor: 'ليلى حسن',
    level: 'متوسط',
    duration: '45 ساعة',
    students: 2450,
    rating: 4.8,
    image: 'https://placehold.co/400x250?text=تصميم+جرافيكي',
    category: 'design',
    price: 'مجانًا',
    description: 'احترف فن التصميم الجرافيكي باستخدام أدوات مثل Adobe Photoshop و Illustrator.',
    whatYouWillLearn: [
      'تصميم الشعارات والهوية البصرية',
      'تصميم المنشورات على وسائل التواصل',
      'العمل مع الطبقات والأدوات المتقدمة',
      'تصدير التصاميم بجودة عالية'
    ],
    curriculum: [
      { title: 'مقدمة إلى التصميم الجرافيكي', duration: '2:00' },
      { title: 'أدوات Photoshop الأساسية', duration: '4:30' },
      { title: 'الطبقات والتعديلات', duration: '5:10' },
      { title: 'تصميم الشعارات', duration: '6:00' },
      { title: 'تصميم المنشورات', duration: '5:40' },
      { title: 'مقدمة إلى Illustrator', duration: '7:20' },
      { title: 'تصدير التصاميم', duration: '3:00' }
    ]
  },
  {
    id: 4,
    title: 'إدارة المشاريع الناجحة',
    instructor: 'عمر فؤاد',
    level: 'مبدئي',
    duration: '30 ساعة',
    students: 1890,
    rating: 4.6,
    image: 'https://placehold.co/400x250?text=إدارة+مشاريع',
    category: 'business',
    price: 'مجانًا',
    description: 'تعلم كيفية إدارة المشاريع من الفكرة إلى التنفيذ باستخدام منهجيات حديثة مثل Agile و Scrum.',
    whatYouWillLearn: [
      'تخطيط المشاريع وتحديد الأهداف',
      'إدارة الوقت والموارد',
      'منهجيات Agile و Scrum',
      'تحليل المخاطر وتقييم الأداء'
    ],
    curriculum: [
      { title: 'مقدمة إلى إدارة المشاريع', duration: '2:30' },
      { title: 'تحديد الأهداف والنتائج', duration: '3:10' },
      { title: 'تخطيط الوقت والموارد', duration: '4:20' },
      { title: 'منهجية Agile', duration: '5:00' },
      { title: 'فرق العمل ودينامياتها', duration: '4:40' },
      { title: 'تحليل المخاطر', duration: '3:30' },
      { title: 'تقييم أداء المشروع', duration: '3:50' }
    ]
  },
  {
    id: 5,
    title: 'تحليل البيانات باستخدام بايثون',
    instructor: 'نور الدين',
    level: 'متقدم',
    duration: '60 ساعة',
    students: 2100,
    rating: 4.8,
    image: 'https://placehold.co/400x250?text=تحليل+بيانات',
    category: 'programming',
    price: 'مجانًا',
    description: 'تعلم تحليل البيانات باستخدام Python و bibliothèques مثل Pandas, NumPy, و Matplotlib.',
    whatYouWillLearn: [
      'استيراد وتنظيف البيانات',
      'تحليل البيانات باستخدام Pandas',
      'التصورات البيانية باستخدام Matplotlib',
      'تحليل إحصائي أساسي'
    ],
    curriculum: [
      { title: 'مقدمة إلى تحليل البيانات', duration: '3:00' },
      { title: 'Python للمبتدئين', duration: '5:00' },
      { title: 'Pandas و NumPy', duration: '8:00' },
      { title: 'تنظيف البيانات', duration: '6:30' },
      { title: 'التصورات البيانية', duration: '7:00' },
      { title: 'التحليل الإحصائي', duration: '6:00' },
      { title: 'مشاريع عملية', duration: '10:00' }
    ]
  },
  {
    id: 6,
    title: 'الذكاء الاصطناعي للمبتدئين',
    instructor: 'د. ريم السعدي',
    level: 'متوسط',
    duration: '50 ساعة',
    students: 3500,
    rating: 4.9,
    image: 'https://placehold.co/400x250?text=ذكاء+اصطناعي',
    category: 'ai',
    price: 'مجانًا',
    description: 'مقدمة شاملة إلى الذكاء الاصطناعي وتعلّم الآلة باستخدام أدوات بسيطة وسهلة الفهم.',
    whatYouWillLearn: [
      'مفاهيم الذكاء الاصطناعي الأساسية',
      'نماذج تعلّم الآلة البسيطة',
      'استخدام أدوات مثل Google Teachable Machine',
      'تطبيقات عملية للذكاء الاصطناعي'
    ],
    curriculum: [
      { title: 'مقدمة إلى الذكاء الاصطناعي', duration: '4:00' },
      { title: 'نماذج التصنيف', duration: '6:00' },
      { title: 'معالجة اللغة الطبيعية', duration: '7:00' },
      { title: 'الرؤية الحاسوبية', duration: '8:00' },
      { title: 'مشاريع تفاعلية', duration: '10:00' },
      { title: 'الأخلاقيات في الذكاء الاصطناعي', duration: '3:00' },
      { title: 'التطبيقات المستقبلية', duration: '2:00' }
    ]
  }
];