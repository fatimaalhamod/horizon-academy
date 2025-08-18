// دوال متعلقة بالمصادقة والأمان

// دالة لتخزين بيانات المستخدم في التخزين المحلي
export const storeUser = (user) => {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error storing user:', error);
    return false;
  }
};

// دالة لاسترجاع بيانات المستخدم من التخزين المحلي
export const getUser = () => {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// دالة لحذف بيانات المستخدم من التخزين المحلي
export const removeUser = () => {
  try {
    localStorage.removeItem('currentUser');
    return true;
  } catch (error) {
    console.error('Error removing user:', error);
    return false;
  }
};

// دالة للتحقق من صلاحيات المستخدم
export const checkUserRole = (requiredRole) => {
  const user = getUser();
  if (!user) return false;
  
  switch (requiredRole) {
    case 'admin':
      return user.role === 'admin';
    case 'trainer':
      return user.role === 'trainer' || user.role === 'admin';
    case 'student':
      return user.role === 'student' || user.role === 'trainer' || user.role === 'admin';
    default:
      return false;
  }
};

// دالة لتشفير كلمة المرور (بسيط للتوضيح - في الواقع يجب استخدام مكتبات متخصصة)
export const hashPassword = (password) => {
  // هذا مجرد مثال بسيط - لا تستخدم في الإنتاج
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

// دالة للتحقق من صحة رمز التحقق
export const validateVerificationCode = (inputCode, storedCode) => {
  return inputCode === storedCode;
};

// دالة لإنشاء رمز جلسة فريد
export const generateSessionToken = () => {
  return Math.random().toString(36).substr(2, 10) + Date.now().toString(36);
};

// دالة للتحقق من انتهاء صلاحية الجلسة
export const isSessionValid = (token, expiryTime) => {
  if (!token || !expiryTime) return false;
  return Date.now() < expiryTime;
};