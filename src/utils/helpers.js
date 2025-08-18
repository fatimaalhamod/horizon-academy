// دوال مساعدة متنوعة

// دالة لتنسيق الأرقام الكبيرة
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// دالة لحساب التقدم النسبة المئوية
export const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// دالة لتحويل التاريخ إلى نص مقروء
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// دالة لتحديد لون التقييم بناءً على القيمة
export const getRatingColor = (rating) => {
  if (rating >= 4.5) return 'text-green-600';
  if (rating >= 3.5) return 'text-yellow-600';
  return 'text-red-600';
};

// دالة لتحديد حالة المستخدم
export const getUserStatus = (user) => {
  if (user.role === 'admin') return 'مدير';
  if (user.role === 'trainer') return 'مدرب';
  return 'طالب';
};

// دالة لتحديد لون حالة المستخدم
export const getUserStatusColor = (role) => {
  switch (role) {
    case 'admin': return 'bg-red-100 text-red-800';
    case 'trainer': return 'bg-purple-100 text-purple-800';
    case 'student': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// دالة لحساب الوقت المتبقي
export const getTimeRemaining = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
};

// دالة لتحديد ما إذا كان المستخدم مسجلاً دخوله
export const isAuthenticated = (user) => {
  return user !== null && user !== undefined;
};

// دالة للتحقق من صلاحيات المستخدم
export const hasPermission = (user, permission) => {
  if (!user) return false;
  
  switch (permission) {
    case 'view-admin-panel':
      return user.role === 'admin';
    case 'manage-courses':
      return user.role === 'admin' || user.role === 'trainer';
    case 'manage-users':
      return user.role === 'admin';
    case 'view-profile':
      return true;
    default:
      return false;
  }
};

// دالة لتصفية الدورات حسب الفئة
export const filterCoursesByCategory = (courses, category) => {
  if (!category || category === 'all') return courses;
  return courses.filter(course => course.category === category);
};

// دالة للبحث في الدورات
export const searchCourses = (courses, searchTerm) => {
  if (!searchTerm) return courses;
  
  const term = searchTerm.toLowerCase();
  return courses.filter(course => 
    course.title.toLowerCase().includes(term) ||
    course.description.toLowerCase().includes(term) ||
    course.category.toLowerCase().includes(term)
  );
};

// دالة لفرز الدورات
export const sortCourses = (courses, sortBy) => {
  switch (sortBy) {
    case 'newest':
      return [...courses].sort((a, b) => b.id - a.id);
    case 'highest-rated':
      return [...courses].sort((a, b) => b.rating - a.rating);
    case 'most-popular':
      return [...courses].sort((a, b) => b.students - a.students);
    default:
      return courses;
  }
};

// دالة لحساب متوسط التقييم
export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
};

// دالة لتحويل الدقائق إلى ساعات ودقائق
export const convertMinutesToHours = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} ساعة ${remainingMinutes} دقيقة`;
};