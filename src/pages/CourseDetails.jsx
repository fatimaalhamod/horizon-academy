// src/pages/CourseDetails.js
import React from "react";
import logo from "../assets/images/logo.png";

const CourseDetails = ({ navigateTo, currentUser, handleLogout, course }) => {
  //  تأكد من وجود الدورة
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">لم يتم العثور على الدورة</h2>
          <button
            onClick={() => navigateTo("courses")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            العودة إلى الدورات
          </button>
        </div>
      </div>
    );
  }

  //  استخدم الدورة المرسلة
  const data = course;

  //  تأكد من وجود المُدرّب
  const instructorName = data.instructor?.name || "مُدرّب غير معروف";

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
              {currentUser ? (
                <>
                  <button 
                    onClick={() => navigateTo("profile")}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
                  >
                    <span>{currentUser.name}</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    <span>خروج</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src={data.image} 
                alt={data.title} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                <p className="text-gray-700 mb-6">{data.description}</p>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">ماذا ستتعلم؟</h3>
                  <ul className="space-y-2">
                    {data.whatYouWillLearn && data.whatYouWillLearn.length > 0 ? (
                      data.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 ml-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">لا توجد معلومات متاحة.</li>
                    )}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">المحتوى التعليمي</h3>
                  <div className="space-y-2">
                    {data.curriculum && data.curriculum.length > 0 ? (
                      data.curriculum.map((lesson, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span>{lesson.title}</span>
                          <span className="text-gray-500">{lesson.duration}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500">لا يوجد منهج محدد.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-yellow-500">⭐ {data.rating}</div>
                <div className="text-gray-600">تقييم الدورة</div>
              </div>
              <div className="space-y-3 mb-6 text-sm text-gray-700">
                <div>المُدرّب: <span className="font-medium">{instructorName}</span></div>
                <div>المدة: <span className="font-medium">{data.duration}</span></div>
                <div>المستوى: <span className="font-medium">{data.level || "متوسط"}</span></div>
                <div>الطلاب: <span className="font-medium">{(data.students || 0).toLocaleString()}</span></div>
              </div>
              <button 
                onClick={() => navigateTo("course-levels", data)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition transform hover:scale-105"
              >
                ابدأ الدورة الآن
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigateTo("courses")}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition flex items-center"
        >
          ← العودة إلى الدورات
        </button>
      </div>

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 أكاديمية الأفق. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default CourseDetails;