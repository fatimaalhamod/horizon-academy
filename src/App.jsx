// src/App.jsx
import React, { useState, useEffect } from "react";

//  استيراد الصورة)
import marketingImg from "./assets/images/marketing.jpeg";
import webdevImg from "./assets/images/webdev.jpg";
import designImg from "./assets/images/design.jpg";
import dataImg from "./assets/images/data.png";
import uiImg from "./assets/images/ui.jpeg";
import logo from "./assets/images/logo.png";

//  استيراد الصفحات 
import HomePage from "./pages/HomePage";       
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import CoursePage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import CourseLevels from "./pages/CourseLevelsPage";
import Profile from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminPage";
import TrainerDashboard from "./pages/TrainerPage";
import ForgotPassword from "./pages/ForgotPassword";
import ErrorBoundary from "./components/ErrorBoundary";
import CertificatePage from "./pages/CertificatePage";
const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  // الدورات: مع بيانات كاملة وصحيحة
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("courses");
    return saved ? JSON.parse(saved) : [
     {
        id: 1,
        title: "التسويق الرقمي المتقدم",
        instructor: { email: "fatima@gmail.com", name: "فاطمة محمد" },
        image: marketingImg,
        description: "تعلم استراتيجيات التسويق الرقمي الحديثة وتحليل الجمهور.",
        category: "تسويق رقمي",
        duration: "52 ساعة",
        rating: 4.7,
        students: 3120,
        level: "متوسط",
        whatYouWillLearn: [
          "تحليل الجمهور المستهدف",
          "بناء حملات تسويق ناجحة",
          "استخدام أدوات التسويق الرقمي"
        ],
        curriculum: [
          { title: "مقدمة إلى التسويق", duration: "2 ساعة" },
          { title: "تحليل البيانات", duration: "3 ساعة" }
        ],
        levels: [
          {
            id: 1,
            title: "المستوى الأول: الأساسيات",
            description: "تعلم أساسيات التسويق الرقمي.",
            lectures: [
              {
                id: 1,
                title: "مقدمة إلى التسويق الرقمي",
                videoUrl: "https://youtu.be/Kve6H57pkDw?si=JXvG8KZidOJ6eBBt"
              },
              {
                id: 2,
                title: "تحليل الجمهور المستهدف",
                videoUrl: "https://youtu.be/9cFzELaP0u0?si=QwgAfl_7xEn30kKt"
              }
            ],
            quiz: [
              {
                id: 1,
                question: "ما هو الهدف الرئيسي من التسويق الرقمي؟",
                options: ["زيادة المبيعات", "بناء العلامة التجارية", "جذب الزوار", "تحسين تجربة المستخدم"],
                correctAnswer: 0
              }
            ]
          },
          {
            id: 2,
            title: "المستوى الثاني: الإعلانات",
            description: "تعلم إنشاء إعلانات فعّالة على وسائل التواصل.",
            lectures: [
              {
                id: 3,
                title: "إعلانات فيسبوك وإنستغرام",
                videoUrl: "https://youtu.be/t-3QZhSvDJA?si=127ACAkqrC5X-PNU"
              },
              {
                id: 4,
                title: "تحليل أداء الحملات",
                videoUrl: "https://youtu.be/JbR56aDUdDE?si=6YWIA2FyhGdScp02"
              }
            ],
            quiz: [
              {
                id: 2,
                question: "ما هو أفضل وقت لنشر الإعلانات؟",
                options: ["الصباح", "الظهيرة", "المساء", "يعتمد على الجمهور"],
                correctAnswer: 3
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "تطوير تطبيقات الويب",
        instructor: { email: "ahmed@gmail.com", name: "أحمد نبيل" },
        image: webdevImg,
        description: "احترف تطوير تطبيقات الويب باستخدام React وNode.js.",
        category: "تطوير ويب",
        duration: "75 ساعة",
        rating: 4.9,
        students: 2840,
        level: "متقدم",
        whatYouWillLearn: [
          "بناء واجهات مستخدم تفاعلية",
          "استخدام React وNode.js",
          "نشر التطبيقات"
        ],
        curriculum: [
          { title: "مقدمة إلى HTML وCSS", duration: "3 ساعة" },
          { title: "JavaScript المتقدم", duration: "4 ساعة" }
        ],
        levels: [
          {
            id: 1,
            title: "المستوى الأول: الأساسيات",
            description: "تعلم HTML, CSS, وJavaScript.",
            lectures: [
              {
                id: 1,
                title: "مقدمة إلى HTML وCSS",
                videoUrl: "https://youtu.be/c9559JVpFV4?si=9UF9zqzdBKugNJit"
              },
              {
                id: 2,
                title: "أساسيات JavaScript",
                videoUrl: "https://youtu.be/PWuTLTFMtYw?si=YFIxsBkZ0-EUgk6s"
              }
            ],
            quiz: [
              {
                id: 1,
                question: "ما وظيفة CSS؟",
                options: ["تنسيق الصفحة", "إضافة منطق", "ربط قاعدة البيانات", "إنشاء صور"],
                correctAnswer: 0
              }
            ]
          },
          {
            id: 2,
            title: "المستوى الثاني: React",
            description: "تعلم بناء تطبيقات تفاعلية باستخدام React.",
            lectures: [
              {
                id: 3,
                title: "مقدمة إلى React",
                videoUrl: "https://youtu.be/s2skans2dP4?si=wPn0QUVAO8KH3Yf6"
              },
              {
                id: 4,
                title: "إدارة الحالة (State)",
                videoUrl: "https://youtu.be/4ORZ1GmjaMc?si=O3tOMQ0VQ9983WCk"
              }
            ],
            quiz: [
              {
                id: 2,
                question: "ما وظيفة useState؟",
                options: ["تحديث الحالة", "التفاعل مع DOM", "الاتصال بالخادم", "عرض العناصر"],
                correctAnswer: 0
              }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "التصميم الجرافيكي الاحترافي",
        instructor: { email: "fatima@gmail.com", name: "فاطمة محمد" },
        image: designImg,
        description: "احترف فن التصميم باستخدام Photoshop وIllustrator.",
        category: "تصميم جرافيكي",
        duration: "45 ساعة",
        rating: 4.8,
        students: 2450,
        level: "مبتدئ",
        whatYouWillLearn: [
          "استخدام أدوات التصميم",
          "تصميم الشعارات",
          "تحرير الصور"
        ],
        curriculum: [
          { title: "مقدمة إلى Photoshop", duration: "2 ساعة" },
          { title: "تصميم الشعارات", duration: "3 ساعة" }
        ],
        levels: [
          {
            id: 1,
            title: "المستوى الأول: الأدوات",
            description: "تعلم استخدام أدوات التصميم الأساسية.",
            lectures: [
              {
                id: 1,
                title: "مقدمة إلى Photoshop",
                videoUrl: "https://youtu.be/ysShyX50r6U?si=CjSZCfzo6hTT8Kfq"
              },
              {
                id: 2,
                title: "أدوات التحديد والقص",
                videoUrl: "https://youtu.be/ysShyX50r6U?si=CjSZCfzo6hTT8Kfq"
              }
            ],
            quiz: [
              {
                id: 1,
                question: "أي أداة تُستخدم لقص الصور؟",
                options: ["Crop Tool", "Brush Tool", "Text Tool", "Eraser Tool"],
                correctAnswer: 0
              }
            ]
          },
          {
            id: 2,
            title: "المستوى الثاني: التصميم",
            description: "تعلم تصميم الشعارات والهويات البصرية.",
            lectures: [
              {
                id: 3,
                title: "تصميم الشعارات",
                videoUrl: "https://youtu.be/s3kGDG6Ex2s?si=spYmzeXI4wRHOL5Z"
              },
              {
                id: 4,
                title: "الهوية البصرية",
                videoUrl: "https://youtu.be/eFDofw2wliQ?si=y6TQ-yjN8wjO1JTF"
              }
            ],
            quiz: [
              {
                id: 2,
                question: "ما أهمية التباين في التصميم؟",
                options: ["تحسين الجمالية", "زيادة الوضوح", "تقليل الحجم", "تسريع الأداء"],
                correctAnswer: 1
              }
            ]
          }
        ]
      },
      {
        id: 4,
        title: "تحليل البيانات باستخدام بايثون",
        instructor: { email: "ahmed@gmail.com", name: "أحمد نبيل" },
        image: dataImg,
        description: "تعلم تحليل البيانات واستخراج الرؤى باستخدام بايثون.",
        category: "تحليل بيانات",
        duration: "60 ساعة",
        rating: 4.6,
        students: 1980,
        level: "متوسط",
        whatYouWillLearn: [
          "أساسيات بايثون",
          "تحليل البيانات باستخدام Pandas",
          "عرض النتائج"
        ],
        curriculum: [
          { title: "مقدمة إلى بايثون", duration: "3 ساعة" },
          { title: "تحليل البيانات", duration: "5 ساعة" }
        ],
        levels: [
          {
            id: 1,
            title: "المستوى الأول: المفاهيم الأساسية",
            description: "تعلم أساسيات بايثون وتحليل البيانات.",
            lectures: [
              {
                id: 1,
                title: "مقدمة إلى بايثون",
                videoUrl: "https://youtu.be/QXeEoD0pB3E?si=VA7evKrfEs0yflkb"
              },
              {
                id: 2,
                title: "أنواع البيانات",
                videoUrl: "https://youtu.be/TqPzwenhMj0?si=mU0FVyqe6JEqu-GI"
              }
            ],
            quiz: [
              {
                id: 1,
                question: "ما هو نوع البيانات في Python؟",
                options: ["Integer", "String", "List", "كل ما سبق"],
                correctAnswer: 3
              }
            ]
          },
          {
            id: 2,
            title: "المستوى الثاني: Pandas",
            description: "تعلم استخدام Pandas لتحليل البيانات.",
            lectures: [
              {
                id: 3,
                title: "مقدمة إلى Pandas",
                videoUrl: "https://youtu.be/CmorAWRsCAw?si=PvBEZ8MOEikM1kze"
              },
              {
                id: 4,
                title: "تصفية البيانات",
                videoUrl: "https://youtu.be/A8eFszOSha4?si=XMcF1oUo6oeo3P6h"
              }
            ],
            quiz: [
              {
                id: 2,
                question: "ما وظيفة df.head()؟",
                options: ["عرض الصفوف الأولى", "حساب المتوسط", "تصفية البيانات", "رسم الرسوم البيانية"],
                correctAnswer: 0
              }
            ]
          }
        ]
      }
    ];
  });

  //  المستخدمون
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: "فاطمة", 
        email: "fatomkaled47@gmail.com", 
        role: "طالب", 
        password: "123456",
        phone: "0932684879",
        birthDate: "2002-05-15",
        progress: {} 
      },
      { 
        id: 2, 
        name: "فاطمة محمد", 
        email: "fatima@gmail.com", 
        role: "مدرب", 
        password: "fatima2025",
        phone: "0932684879",
        bio: "مُدرّبة في التسويق الرقمي",
      
      },
      { 
        id: 3, 
        name: "أحمد نبيل", 
        email: "ahmed@gmail.com", 
        role: "مدرب", 
        password: "ahmed2025",
        phone: "0932684879",
        bio: "مُدرّب في تطوير الويب",
       
      }
    ];
  });
  

  //  حفظ الدورات والمستخدمين
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  //  استعادة المستخدم الحالي
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const navigateTo = (page, course = null) => {
    if (course) setCurrentCourse(course);
    setCurrentPage(page);
  };

  const handleLogin = (user) => {
    const { email, password } = user;
    const navigateTo = (page, data = null) => {
  if (data?.course) setCurrentCourse(data.course);
  if (data?.levelId) {
    // حفظ levelId مؤقتًا في localStorage
    localStorage.setItem("currentLevelId", data.levelId.toString());
    // داخل handleLogin
const userWithProgress = {
  ...foundUser,
  progress: foundUser.progress || {} // يُحمّل التقدم من localStorage
};
setCurrentUser(userWithProgress);
localStorage.setItem("currentUser", JSON.stringify(userWithProgress));
  }
  
  setCurrentPage(page);
};

    // تسجيل دخول المدير
    if (email === "admin@gmail.com" && password === "admin2025") {
      const adminUser = {
        name: "مدير النظام",
        email: "admin@gmail.com",
        role: "admin"
      };
      setCurrentUser(adminUser);
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      navigateTo("admin-dashboard");
      return;
    }

    // تسجيل دخول المستخدم أو المدرب
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userWithProgress = {
        ...foundUser,
        progress: foundUser.progress || {}
      };
      setCurrentUser(userWithProgress);
      localStorage.setItem("currentUser", JSON.stringify(userWithProgress));

      if (foundUser.role === "مدرب") {
        navigateTo("trainer-dashboard");
      } else {
        navigateTo("courses");
      }
    } else {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigateTo("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigateTo={navigateTo} currentUser={currentUser} handleLogout={handleLogout} />;
      case "login":
        return <Login navigateTo={navigateTo} handleLogin={handleLogin} currentUser={currentUser} />;
      case "forgot-password":
        return <ForgotPassword navigateTo={navigateTo} />;
      case "register":
        return <Register navigateTo={navigateTo} handleRegister={handleRegister} />;
      case "courses":
        return <CoursePage navigateTo={navigateTo} currentUser={currentUser} handleLogout={handleLogout} courses={courses} />;
      case "course-details":
        return <CourseDetails navigateTo={navigateTo} currentUser={currentUser} handleLogout={handleLogout} course={currentCourse} />;
      case "course-levels":
        return <CourseLevels navigateTo={navigateTo} currentUser={currentUser} handleLogout={handleLogout} course={currentCourse} />;
case "certificate":
        return <CertificatePage 
          navigateTo={navigateTo} 
          currentUser={currentUser} 
          handleLogout={handleLogout}
          certificate={currentCourse}
        />;
      case "profile":
        return <Profile navigateTo={navigateTo} currentUser={currentUser} handleLogout={handleLogout} />;
      case "admin-dashboard":
        return <AdminDashboard 
                navigateTo={navigateTo} 
                currentUser={currentUser}
                courses={courses}
                users={users}
                setCourses={setCourses}
                setUsers={setUsers}
               handleLogout={handleLogout}
              />;
      case "trainer-dashboard":
        return <TrainerDashboard 
                navigateTo={navigateTo} 
                currentUser={currentUser}
                courses={courses}
                setCourses={setCourses}
                 handleLogout={handleLogout} 
              />;
      default:
        return <HomePage navigateTo={navigateTo} currentUser={currentUser} handleLogout={handleLogout} />;
    }
  };

  const handleRegister = (newUser) => {
    const exists = users.some(u => u.email === newUser.email);
    if (exists) {
      alert("هذا البريد الإلكتروني مسجل مسبقًا");
      return;
    }
    const user = { 
      ...newUser, 
      id: users.length + 1, 
      role: "طالب",
      progress: {} 
    };
    setUsers([...users, user]);
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigateTo("courses");
  };

  return (
    <ErrorBoundary>
      <div className="App">
        {renderPage()}
      </div>
    </ErrorBoundary>
  );
};

export default App;