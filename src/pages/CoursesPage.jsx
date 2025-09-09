// src/pages/CoursePage.js
import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";


//  نقل RatingWidget إلى الأعلى
const RatingWidget = ({ course, currentUser }) => {
  const [localRating, setLocalRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.role === "مدرب") return;
    const savedRatings = localStorage.getItem("courseRatings");
    const ratings = savedRatings ? JSON.parse(savedRatings) : {};
    const userRatingKey = `${currentUser.email}-${course.id}`;
    if (ratings[userRatingKey]) {
      setLocalRating(ratings[userRatingKey]);
      setHasRated(true);
    }
  }, [currentUser, course.id]);

  const handleRate = (stars) => {
    if (!currentUser || currentUser.role === "مدرب") return;
    if (hasRated) return;

    const savedRatings = localStorage.getItem("courseRatings");
    const ratings = savedRatings ? JSON.parse(savedRatings) : {};
    const userRatingKey = `${currentUser.email}-${course.id}`;

    ratings[userRatingKey] = stars;
    localStorage.setItem("courseRatings", JSON.stringify(ratings));
    setLocalRating(stars);
    setHasRated(true);
    alert(`شكرًا لتقييمك ${stars} نجوم!`);
  };

  if (!currentUser || currentUser.role === "مدرب") {
    return <p className="text-gray-500 text-sm">غير مسموح بالتقييم للمدربين.</p>;
  }

  return (
    <div>
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRate(star)}
            className={`text-lg transition ${
              star <= localRating ? "text-yellow-500" : "text-gray-300"
            } ${!hasRated ? 'hover:text-yellow-500 cursor-pointer' : 'cursor-not-allowed'}`}
            disabled={hasRated}
          >
            ★
          </button>
        ))}
      </div>
      {hasRated ? (
        <p className="text-green-600 text-sm font-medium">تم التقييم!</p>
      ) : (
        <p className="text-gray-500 text-xs">انقر على النجوم لتقييم الدورة</p>
      )}
    </div>
  );
};

const CoursePage = ({ navigateTo, currentUser, handleLogout, courses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  //  استخراج الفئات الفريدة
  const categories = [
    { id: 'all', name: 'الكل' },
    ...Array.from(new Set(courses.map(course => course.category))).map(cat => ({
      id: cat,
      name: cat
    }))
  ];

  //  تصفية الدورات
  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchTerm === '' ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.instructor?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
              {!currentUser ? (
                <>
                  <button 
                    onClick={() => navigateTo("login")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    تسجيل الدخول
                  </button>
                  <button 
                    onClick={() => navigateTo("register")}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                  >
                    إنشاء حساب
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 animate-fade-in-down">الدورات التعليمية</h1>

        {/* شريط البحث والتصفية */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="ابحث عن دورة أو مدرب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* عرض الدورات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105 animate-fade-in-up">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                      ⭐ {course.rating}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-1">بواسطة: {course.instructor?.name || "غير معين"}</p>
                  <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span>⏱️ {course.duration}</span>
                    <span>👥 {course.students?.toLocaleString() || 0}</span>
                  </div>

                  {/* نظام التقييم */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">قيّم هذه الدورة:</p>
                    <RatingWidget course={course} currentUser={currentUser} />
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-bold text-green-600">{course.price || "مجانًا"}</span>
                    <button 
                      onClick={() => navigateTo("course-details", course)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                    >
                      تفاصيل الدورة
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg py-10">
              لا توجد دورات تطابق البحث أو التصفية.
            </p>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 أكاديمية الأفق. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* أنماط CSS مخصصة */}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CoursePage;