// src/pages/Profile.js
import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
const Profile = ({ navigateTo, currentUser, handleLogout }) => {
  //  استخدام بيانات المستخدم الحقيقية
  const [data, setData] = useState(currentUser);

  //  استرجاع تقدم الطالب من localStorage
  const [userProgress, setUserProgress] = useState({});

  //  تحديث التقدم عند تحميل الصفحة
  useEffect(() => {
    const key = `progress_${currentUser?.email}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        setUserProgress(progress);
      } catch (e) {
        console.error("فشل في تحليل بيانات التقدم", e);
      }
    }
  }, [currentUser?.email]);

  //  استرجاع جميع الدورات
  const [courses] = useState(() => {
    const saved = localStorage.getItem("courses");
    return saved ? JSON.parse(saved) : [];
  });

  //  الدورات الحالية (تم بدؤها ولكن لم تُكتمل)
  const currentCourses = courses
    .filter(course => {
      const totalLevels = course.levels?.length || 0;
      if (totalLevels === 0) return false;

      const completedLevels = course.levels.filter(level => 
        userProgress[`course_${course.id}_level_${level.id}`]?.completed
      ).length;

      return completedLevels > 0 && completedLevels < totalLevels;
    })
    .map(course => {
      const completedLevels = course.levels.filter(level => 
        userProgress[`course_${course.id}_level_${level.id}`]?.completed
      ).length;
      const totalLevels = course.levels.length;
      const progress = Math.round((completedLevels / totalLevels) * 100);
      return { ...course, progress };
    });

  //  الدورات المكتملة (جميع المستويات مكتملة)
  const completedCourses = courses.filter(course => {
    const totalLevels = course.levels?.length || 0;
    if (totalLevels === 0) return false;

    const completedCount = course.levels.filter(level => 
      userProgress[`course_${course.id}_level_${level.id}`]?.completed
    ).length;

    return completedCount === totalLevels;
  });

  //  التقييمات (اختياري)
  const [ratings] = useState(() => {
    const saved = localStorage.getItem("courseRatings");
    const allRatings = saved ? JSON.parse(saved) : {};
    return Object.entries(allRatings)
      .filter(([key]) => key.startsWith(`${currentUser.email}-`))
      .map(([key, stars]) => {
        const courseId = parseInt(key.split('-')[1]);
        const course = courses.find(c => c.id === courseId);
        return { course: course?.title, stars };
      });
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); //  نافذة تغيير الصورة

  //  حالة الصورة
  const [profileImage, setProfileImage] = useState(() => {
    //  تحميل الصورة من localStorage أو استخدام افتراضية
    return localStorage.getItem(`profileImage_${currentUser.email}`) || "/assets/images/avatar-placeholder.png";
  });

  // بيانات التعديل
  const [editName, setEditName] = useState(data.name);
  const [editEmail, setEditEmail] = useState(data.email);
  const [editPhone, setEditPhone] = useState(data.phone);
  const [editBirthDate, setEditBirthDate] = useState(data.birthDate);

  // بيانات تغيير كلمة المرور
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //  حفظ تعديلات الملف الشخصي
  const handleSaveProfile = () => {
    const updatedUser = {
      ...data,
      name: editName,
      email: editEmail,
      phone: editPhone,
      birthDate: editBirthDate
    };
    // تحديث البيانات في الواجهة
    setData(updatedUser);

    // تحديث المستخدم في localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
    setShowEditModal(false);
  };

  //  تغيير كلمة المرور
  const handleChangePassword = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === currentUser.email);

    if (!user || user.password !== currentPassword) {
      alert("كلمة المرور الحالية غير صحيحة");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("كلمة المرور غير متطابقة");
      return;
    }

    if (newPassword.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    // تحديث كلمة المرور
    user.password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("تم تغيير كلمة المرور بنجاح!");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordModal(false);
  };

  //  تغيير صورة الملف الشخصي
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
        // حفظ الصورة في localStorage
        localStorage.setItem(`profileImage_${currentUser.email}`, base64Image);
        // تحديث currentUser
        const updatedUser = { ...currentUser, avatar: base64Image };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src={logo}
                alt="أكاديمية الأفق" 
                className="h-12"
              />
            </div>
            
            <div className="flex items-center space-x-4">
               <button
            onClick={() => navigateTo("courses")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            العودة إلى الدورات
          </button>
              <button 
                onClick={() => navigateTo("profile")}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>{currentUser.name}</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* قسم المعلومات الشخصية */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="text-gray-400">{data.role}</p>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p><strong>البريد الإلكتروني:</strong> {data.email}</p>
                <p><strong>رقم الهاتف:</strong> {data.phone}</p>
                <p><strong>تاريخ الميلاد:</strong> {data.birthDate}</p>
              </div>
            </div>
            <div className="relative">
              {/* عرض الصورة */}
              <img 
                src={profileImage} 
                alt="صورة الملف الشخصي" 
                className="bg-purple-600 text-white rounded-full h-16 w-16 object-cover"
                style={{ objectPosition: 'center' }}
              />
              {/* زر تغيير الصورة */}
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                title="تغيير الصورة"
              >
                ✏️
              </button>
            </div>
          </div>

          {/* التقييم، الإنجازات، الدورات المكتملة */}
          <div className="flex space-x-4 space-x-reverse mb-6">
            <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg">
              <span>التقييم</span>
              <span className="mr-2">⭐ {4.8}</span>
            </div>
            <div className="bg-green-100 text-green-600 px-4 py-2 rounded-lg">
              <span>{completedCourses.length} دورة مكتملة</span>
            </div>
            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">
              <span>{currentCourses.length} دورة حالية</span>
            </div>
          </div>

          {/* أزرار التعديل وتغيير كلمة المرور */}
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              تغيير كلمة السر
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              تعديل الملف الشخصي
            </button>
          </div>
        </div>

        {/* الدورات الحالية، المكتملة، والإنجازات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* الدورات الحالية */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">الدورات الحالية</h2>
            {currentCourses.length > 0 ? (
              currentCourses.map(course => (
                <div key={course.id} className="mb-4 border-b pb-4">
                  <h3 className="font-bold">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{course.progress}% مكتمل</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">لا توجد دورات حالية</p>
            )}
          </div>

          {/* الدورات المكتملة */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">الدورات المكتملة</h2>
            {completedCourses.length > 0 ? (
              completedCourses.map(course => (
                <div key={course.id} className="mb-4 border-b pb-4">
                  <h3 className="font-bold">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor.name}</p>
                  <span className="text-green-600 text-sm">✅ مكتملة</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">لم تكمل أي دورة بعد</p>
            )}
          </div>

          {/* التقييمات */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">التقييمات</h2>
            {ratings.length > 0 ? (
              ratings.map((rating, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                  <h3 className="font-bold">{rating.course}</h3>
                  <span className="text-yellow-500">⭐ {rating.stars}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">لم تقيّم أي دورة بعد</p>
            )}
          </div>
        </div>
      </main>

      {/* نافذة تعديل الملف الشخصي */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full animate-fade-in-up">
            <h3 className="text-xl font-bold mb-6">تعديل الملف الشخصي</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الميلاد</label>
                <input
                  type="date"
                  value={editBirthDate}
                  onChange={(e) => setEditBirthDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveProfile}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تغيير كلمة المرور */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full animate-fade-in-up">
            <h3 className="text-xl font-bold mb-6">تغيير كلمة المرور</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور الحالية</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تأكيد كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleChangePassword}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                تغيير كلمة المرور
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تغيير الصورة */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full animate-fade-in-up">
            <h3 className="text-xl font-bold mb-6">تغيير صورة الملف الشخصي</h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">اختر صورة</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <div className="mt-4 text-center">
                {profileImage && (
                  <img 
                    src={profileImage} 
                    alt="معاينة" 
                    className="h-32 w-32 object-cover rounded-full mx-auto"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 أكاديمية الأفق. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* أنماط CSS مخصصة */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;