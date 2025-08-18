
import React, { useState, useEffect } from "react";
import marketingImg from '../assets/images/marketing.jpeg';
import webdevImg from '../assets/images/webdev.jpg';
import designImg from '../assets/images/design.jpg';
import logo from "../assets/images/logo.png";
const Homepage = ({ navigateTo, currentUser, handleLogout }) => {
  const [stats, setStats] = useState({ students: 0, courses: 0, satisfaction: 0 });

  useEffect(() => {
    const targetStats = { students: 50000, courses: 200, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStudents = 0;
    let currentCourses = 0;
    let currentSatisfaction = 0;
    const increment = {
      students: targetStats.students / steps,
      courses: targetStats.courses / steps,
      satisfaction: targetStats.satisfaction / steps
    };

    const timer = setInterval(() => {
      currentStudents += increment.students;
      currentCourses += increment.courses;
      currentSatisfaction += increment.satisfaction;
      setStats({
        students: Math.min(Math.floor(currentStudents), targetStats.students),
        courses: Math.min(Math.floor(currentCourses), targetStats.courses),
        satisfaction: Math.min(Math.floor(currentSatisfaction), targetStats.satisfaction)
      });
      if (currentStudents >= targetStats.students &&
          currentCourses >= targetStats.courses &&
          currentSatisfaction >= targetStats.satisfaction) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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

      {/* القسم الرئيسي */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            اكتشف آفاق جديدة في التعليم
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          مشوار النجاح يبدأ بخطوة... ابدأ رحلتك التعليمية مع كورسات متطورة في مجالات مختلفة مع مدربين ذو خبرة طويلة
          </p>
          <button 
            onClick={() => navigateTo("courses")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg transition transform hover:scale-105"
          >
            ابدأ رحلتك التعليمية الآن
          </button>
          <div className="flex justify-center space-x-12 mt-16">
            <div className="text-center transform hover:scale-110 transition duration-300">
              <div className="text-4xl font-bold text-blue-600">+{stats.students.toLocaleString()}</div>
              <div className="text-gray-600">طالب مسجل</div>
            </div>
            <div className="text-center transform hover:scale-110 transition duration-300">
              <div className="text-4xl font-bold text-green-600">+{stats.courses}</div>
              <div className="text-gray-600">دورة تدريبية</div>
            </div>
            <div className="text-center transform hover:scale-110 transition duration-300">
              <div className="text-4xl font-bold text-yellow-600">{stats.satisfaction}%</div>
              <div className="text-gray-600">معدل الرضا</div>
            </div>
          </div>
        </div>
      </section>

      {/* لماذا أكاديمية الأفق */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا أكاديمية الأفق؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300 hover:shadow-xl">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">تعلم تفاعلي</h3>
              <p className="text-gray-600">
                منصة تفاعلية متقدمة تجعل التعلم ممتعاً وفعّالاً مع أدوات عملية
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300 hover:shadow-xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">مدربون خبراء</h3>
              <p className="text-gray-600">
                نخبة من أفضل المدربين في مجالاتهم مع خبرة عملية واسعة
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300 hover:shadow-xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">شهادات معتمدة</h3>
              <p className="text-gray-600">
                شهادات معتمدة بعد إكمال الدورات يمكن استخدامها في سيرتك الذاتية
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300 hover:shadow-xl">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">تعلم في أي وقت</h3>
              <p className="text-gray-600">
                الوصول إلى المحتوى في أي وقت ومن أي مكان يناسبك
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* الدورات الأكثر شعبية */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">الدورات الأكثر شعبية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105">
              <img 
                src={marketingImg} 
                alt="التسويق الرقمي المتقدم" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                    ⭐ 4.7
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    الأكثر طلباً
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">التسويق الرقمي المتقدم</h3>
                <p className="text-gray-600 mb-4">تعلم استراتيجيات التسويق الرقمي الحديثة ووسائل التواصل الاجتماعي.</p>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                  <span>👥 3,120 طالب</span>
                  <span>⏱️ 52 ساعة</span>
                </div>
                <button 
                  onClick={() => navigateTo("login")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  الالتحاق الآن
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105">
              <img 
                src={webdevImg} 
                alt="تطوير تطبيقات الويب" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                    ⭐ 4.9
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    الأكثر طلباً
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">تطوير تطبيقات الويب</h3>
                <p className="text-gray-600 mb-4">احترف تطوير تطبيقات الويب باستخدام أحدث التقنيات والأدوات.</p>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                  <span>👥 2,840 طالب</span>
                  <span>⏱️ 75 ساعة</span>
                </div>
                <button 
                  onClick={() => navigateTo("login")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  الالتحاق الآن
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105">
              <img 
                src={designImg}
                alt="التصميم الجرافيكي الاحترافي" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                    ⭐ 4.8
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    الأكثر طلباً
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">التصميم الجرافيكي الاحترافي</h3>
                <p className="text-gray-600 mb-4">احترف فن التصميم الجرافيكي باستخدام أدوات مثل Adobe Photoshop وIllustrator.</p>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                  <span>👥 2,450 طالب</span>
                  <span>⏱️ 45 ساعة</span>
                </div>
                <button 
                  onClick={() => navigateTo("login")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  الالتحاق الآن
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => navigateTo("login")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition transform hover:scale-105"
            >
              عرض جميع الدورات
            </button>
          </div>
        </div>
      </section>

      {/* الفوتر */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img 
                src={logo}
                alt="أكاديمية الأفق" 
                className="h-10 mb-4"
              />
              <p className="text-gray-400">
                نحن ملتزمون بتقديم أفضل تجربة تعليمية رقمية في المنطقة، مع التركيز على الجودة والابتكار في التعليم.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigateTo("login")} className="hover:text-white">الدورات</button></li>
            

              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
              <p className="text-gray-400 mb-2">horizonacademy@gmail.com</p>
              <p className="text-gray-400 mb-4">0963932684879</p>
              <div className="flex space-x-4">
                
              </div>
            </div>
            <div>
              
              
              <div className="flex">
        
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-700" />
          <p className="text-center text-gray-400">
            © 2025 أكاديمية الأفق. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;