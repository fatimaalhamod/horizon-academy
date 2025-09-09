// src/pages/CourseLevelsPage.jsx
import React, { useState, useEffect } from 'react';
import logo from "../assets/images/logo.png";

// دالة استخراج معرف الفيديو من رابط يوتيوب
function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const CourseLevelsPage = ({ navigateTo, currentUser, handleLogout, course }) => {
  const [userProgress, setUserProgress] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);

  // تحديث التقدم من localStorage
  useEffect(() => {
    const key = `progress_${currentUser.email}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        setUserProgress(progress);
      } catch (e) {
        console.error("فشل في تحليل بيانات التقدم", e);
      }
    }
  }, [currentUser.email, course.id]);

  // التحقق من حالة المستوى
  const isLevelLocked = (levelId) => {
    if (levelId === 1) return false;
    const prevLevelKey = `course_${course.id}_level_${levelId - 1}`;
    return !userProgress[prevLevelKey]?.completed;
  };

  const isLevelCompleted = (levelId) => {
    const key = `course_${course.id}_level_${levelId}`;
    return userProgress[key]?.completed;
  };

  // ✅ التحقق من إكمال الدورة بالكامل
  const isCourseCompleted = () => {
    return course.levels.every(level => {
      const levelKey = `course_${course.id}_level_${level.id}`;
      return userProgress[levelKey]?.completed;
    });
  };

  const startLevel = (level) => {
    if (isLevelLocked(level.id)) return;
    setSelectedLevel(level);
  };

 const startQuiz = () => {
  if (!selectedLevel) return;

  // ✅ التحقق من وجود أسئلة
  const quiz = selectedLevel.quiz;
  if (!quiz || quiz.length === 0) {
    // ✅ عرض رسالة إذا لم تكن هناك أسئلة
    alert("❌ لا توجد أسئلة اختبار لهذا المستوى بعد.\nسيتم إضافتها قريبًا.");
    return;
  }

  // ✅ إذا كانت هناك أسئلة، ابدأ الاختبار
  setShowQuiz(true);
  setQuizAnswers({});
  setQuizResults(null);
};

  const handleAnswerChange = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const submitQuiz = () => {
    const quiz = selectedLevel.quiz;
    let correct = 0;
    quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) correct++;
    });

    const score = (correct / quiz.length) * 100;
    const passed = score >= 70; // ✅ 70% كحد أدنى

    setQuizResults({ score, passed });

    if (passed) {
      const levelKey = `course_${course.id}_level_${selectedLevel.id}`;
      const progressKey = `progress_${currentUser.email}`;
      const savedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};

      const updatedProgress = {
        ...savedProgress,
        [levelKey]: { completed: true }
      };

      localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
      setUserProgress(updatedProgress);

      // تحديث currentUser
      const updatedUser = {
        ...currentUser,
        progress: updatedProgress
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const exitQuiz = () => {
    setShowQuiz(false);
    setQuizResults(null);
    setSelectedLevel(null);
  };

  const goBack = () => {
    if (showQuiz) {
      setShowQuiz(false);
      setQuizResults(null);
    } else if (selectedLevel) {
      setSelectedLevel(null);
    } else {
      navigateTo("course-details", course);
    }
  };

  // قائمة المستويات 
  if (!selectedLevel && !showQuiz) {
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
          {/* زر العودة */}
          <div className="mb-8">
            <button
              onClick={goBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition flex items-center"
            >
              ← العودة إلى تفاصيل الدورة
            </button>
          </div>

          {/* معلومات الدورة */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
              <p className="text-gray-600">بواسطة: {course.instructor?.name}</p>
              <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                <span>إجمالي المستويات: {course.levels.length}</span>
                <span>المكتملة: {Object.values(userProgress).filter(p => p.completed).length}</span>
              </div>
            </div>
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>

          {/* عنوان القائمة */}
          <h2 className="text-3xl font-bold text-center mb-12">اختر مستوى للدراسة</h2>

          {/* قائمة المستويات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {course.levels.map((level) => {
              const locked = isLevelLocked(level.id);
              const completed = isLevelCompleted(level.id);

              return (
                <div
                  key={level.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                    locked ? 'opacity-60' : 'hover:shadow-xl'
                  } ${!locked && !completed ? 'cursor-pointer' : ''}`}
                  onClick={() => !locked && !completed && startLevel(level)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                    <p className="text-gray-600 mb-4">{level.description}</p>
                    <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                      <span>📚 {level.lectures?.length || 0} محاضرات</span>
                      <span>⏱️ {level.duration || "4 ساعات"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        completed ? 'bg-green-100 text-green-800' :
                        locked ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {completed ? 'مكتمل' : locked ? 'مقفل' : 'مفتوح'}
                      </span>
                      {locked ? (
                        <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm cursor-not-allowed">
                          مقفل
                        </button>
                      ) : completed ? (
                        <button
                          onClick={() => startLevel(level)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition transform hover:scale-105"
                        >
                          عرض المحاضرات
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startLevel(level);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition transform hover:scale-105"
                        >
                          ابدأ المحاضرات
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // عرض المحاضرات 
  if (selectedLevel && !showQuiz) {
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedLevel.title}</h2>
            <p className="text-gray-600 mb-6">{selectedLevel.description}</p>

            <h3 className="text-lg font-semibold mb-4">المحاضرات:</h3>
            {/* ✅ التحقق من وجود محاضرات */}
            {selectedLevel.lectures.length > 0 ? (
              <div className="space-y-6">
                {selectedLevel.lectures.map((lecture) => {
                  const videoId = getYoutubeId(lecture.videoUrl);
                  if (!videoId) {
                    return <p key={lecture.id} className="text-red-600">رابط الفيديو غير صالح</p>;
                  }
                  return (
                    <div key={lecture.id} className="border rounded-lg overflow-hidden">
                      <h4 className="bg-gray-100 p-3 font-medium">{lecture.title}</h4>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?rel=0`} // ✅ تم إصلاح المسافات الزائدة
                          title={lecture.title}
                          className="w-full h-60"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // ✅ رسالة عندما لا توجد محاضرات
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center">
                <p className="text-yellow-800 text-lg">⚠️ ليس هناك محاضرات بعد</p>
                <p className="text-yellow-600 mt-1">سيتم إضافة المحاضرات قريبًا.</p>
              </div>
            )}
  {/* ✅ عرض زر الاختبار فقط إذا كانت هناك محاضرات */}
          {selectedLevel.lectures.length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={startQuiz}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition transform hover:scale-105"
              >
                أداء اختبار المستوى
              </button>
            </div>
          )}
          </div>
        </main>
      </div>
    );
  }
  // عرض نتيجة الاختبار
  if (showQuiz && selectedLevel && quizResults) {
    const quiz = selectedLevel.quiz;
    const courseCompleted = isCourseCompleted(); // ✅ تم إكمال الدورة؟

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
          <div className="max-w-3xl mx-auto">
            {/* رسالة النتيجة العامة */}
            <div className={`bg-white p-6 rounded-xl shadow-lg text-center mb-6 ${
              quizResults.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <h2 className="text-2xl font-bold mb-2">
                {quizResults.passed ? '🎉 تهانينا، اجتزت الاختبار!' : '❌ لم تجتز الاختبار'}
              </h2>
              <p className="text-lg">
                نتيجتك: <strong>{Math.round(quizResults.score)}%</strong> من <strong>{quiz.length}</strong> سؤال
              </p>
            </div>

            {/* تفاصيل كل سؤال */}
            <h3 className="text-xl font-bold mb-4 text-center">مراجعة الأسئلة</h3>
            <div className="space-y-6">
              {quiz.map((q, qIndex) => {
                const userAnswer = quizAnswers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                const isWrong = userAnswer !== undefined && userAnswer !== q.correctAnswer;

                return (
                  <div key={q.id} className="bg-white p-5 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-3 border-b pb-2">
                      {qIndex + 1}. {q.question}
                    </h4>
                    
                    <div className="space-y-2">
                      {q.options.map((option, idx) => {
                        let bgColor = '';
                        let textColor = 'text-gray-700';
                        let icon = '';

                        if (idx === q.correctAnswer) {
                          bgColor = 'bg-green-100';
                          textColor = 'text-green-800 font-medium';
                          icon = '✅ ';
                        } else if (idx === userAnswer && isWrong) {
                          bgColor = 'bg-red-100';
                          textColor = 'text-red-800 font-medium';
                          icon = '❌ ';
                        } else {
                          bgColor = 'bg-gray-50';
                          textColor = 'text-gray-600';
                        }

                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg ${bgColor} ${textColor} flex items-center`}
                          >
                            <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}:</span>
                            <span>{icon}{option}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* رسالة توضيحية */}
                    {isCorrect ? (
                      <p className="text-green-600 text-sm mt-3 font-medium">رائع! إجابتك صحيحة.</p>
                    ) : (
                      <p className="text-red-600 text-sm mt-3 font-medium">
                        الإجابة الصحيحة: <strong>{q.options[q.correctAnswer]}</strong>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* أزرار التحكم النهائية */}
            <div className="mt-8 text-center space-x-4 space-x-reverse">
              {!quizResults.passed && (
                <button
                  onClick={() => {
                    setQuizResults(null);
                    setQuizAnswers({});
                    setShowQuiz(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  إعادة المحاولة
                </button>
              )}
              {quizResults.passed && courseCompleted ? (
                // ✅ عرض زر الشهادة فقط عند إكمال الدورة
                <button
                  onClick={() => {
                    // ✅ حفظ الشهادة قبل العرض
                    const certKey = `certificates_${currentUser.email}`;
                    const saved = localStorage.getItem(certKey);
                    const certs = saved ? JSON.parse(saved) : [];

                    const newCert = {
                      studentName: currentUser.name,
                      courseTitle: course.title,
                      instructorName: course.instructor.name,
                      date: new Date().toLocaleDateString('ar-SA'),
                      courseId: course.id
                    };

                    if (!certs.some(c => c.courseId === course.id)) {
                      certs.push(newCert);
                      localStorage.setItem(certKey, JSON.stringify(certs));
                    }

                    navigateTo("certificate", newCert);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  عرض الشهادة
                </button>
              ) : (
                <button
                  onClick={exitQuiz}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  {quizResults.passed ? 'متابعة التعلم' : 'العودة إلى المستويات'}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // عرض نموذج الاختبار
  if (showQuiz && selectedLevel && !quizResults) {
    const quiz = selectedLevel.quiz;

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
          <div className="max-w-3xl mx-auto">
            {quiz.map((q) => (
              <div key={q.id} className="bg-white p-5 rounded-lg shadow mb-4">
                <h3 className="font-bold text-lg mb-3">{q.question}</h3>
                <div className="space-y-2">
                  {q.options.map((option, idx) => (
                    <label key={idx} className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={idx}
                        onChange={() => handleAnswerChange(q.id, idx)}
                        className="ml-2"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 flex justify-end">
              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length !== quiz.length}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium"
              >
                تسليم
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default CourseLevelsPage;