// دوال مساعدة لطلبات API

// دالة أساسية لإجراء طلب HTTP
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// دالة لجلب البيانات
export const getData = async (url) => {
  return await apiRequest(url, {
    method: 'GET'
  });
};

// دالة لإرسال البيانات
export const postData = async (url, data) => {
  return await apiRequest(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// دالة لتحديث البيانات
export const putData = async (url, data) => {
  return await apiRequest(url, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

// دالة لحذف البيانات
export const deleteData = async (url) => {
  return await apiRequest(url, {
    method: 'DELETE'
  });
};

// دالة لجلب دورات المستخدم
export const getUserCourses = async (userId) => {
  // في التطبيق الحقيقي سيتم إجراء طلب API
  // هذا مثال فقط
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // بيانات الدورات
      ]);
    }, 1000);
  });
};

// دالة لجلب مستخدم بواسطة المعرف
export const getUserById = async (userId) => {
  // في التطبيق الحقيقي سيتم إجراء طلب API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        // بيانات المستخدم
      });
    }, 500);
  });
};

// دالة لتحديث ملف المستخدم الشخصي
export const updateUserProfile = async (userId, profileData) => {
  // في التطبيق الحقيقي سيتم إجراء طلب API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'تم تحديث الملف الشخصي بنجاح'
      });
    }, 1000);
  });
};

// دالة لإرسال رمز التحقق
export const sendVerificationCode = async (email) => {
  // في التطبيق الحقيقي سيتم إرسال البريد الإلكتروني فعلياً
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني'
      });
    }, 1500);
  });
};

// دالة للتحقق من رمز التحقق
export const verifyCode = async (email, code) => {
  // في التطبيق الحقيقي سيتم التحقق من الرمز فعلياً
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'تم التحقق من الرمز بنجاح'
      });
    }, 1000);
  });
};

// دالة لتسجيل الدخول
export const login = async (email, password) => {
  // في التطبيق الحقيقي سيتم إجراء طلب API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          // بيانات المستخدم
        }
      });
    }, 1500);
  });
};

// دالة لإنشاء حساب جديد
export const register = async (userData) => {
  // في التطبيق الحقيقي سيتم إجراء طلب API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'تم إنشاء الحساب بنجاح'
      });
    }, 2000);
  });
};