// src/pages/TrainerDashboard.js
import React, { useState } from "react";

const TrainerDashboard = ({ navigateTo, currentUser, courses, setCourses }) => {
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddLevelModal, setShowAddLevelModal] = useState(false);
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [showAddQuizModal, setShowAddQuizModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  // بيانات إضافة مستوى
  const [newLevel, setNewLevel] = useState({ title: "", description: "" });

  // بيانات إضافة محاضرة
  const [newLecture, setNewLecture] = useState({
    title: "",
    videoUrl: "",
    levelId: ""
  });

  // بيانات إضافة سؤال اختبار
  const [newQuiz, setNewQuiz] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    levelId: ""
  });

  // بيانات تعديل دورة
  const [editingCourse, setEditingCourse] = useState({});
  const [whatYouWillLearn, setWhatYouWillLearn] = useState([]);
  const [curriculum, setCurriculum] = useState([]);

  // بيانات تعديل الملف الشخصي
  const [editTrainer, setEditTrainer] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    bio: currentUser.bio || "",
    avatar: currentUser.avatar || ""
  });

  //  حالة لملف الصورة
  const [profileImageFile, setProfileImageFile] = useState(null);

  // بيانات تغيير كلمة المرور
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //  الدورات الخاصة بالمدرب فقط
  const trainerCourses = courses.filter(course => {
    return course.instructor && 
           typeof course.instructor === 'object' && 
           course.instructor.email === currentUser.email;
  });

  //  دالة إضافة مستوى
  const handleAddLevel = () => {
    if (!newLevel.title) {
      alert("يرجى إدخال عنوان المستوى");
      return;
    }

    const safeLevels = Array.isArray(selectedCourse.levels) ? selectedCourse.levels : [];
    
    //  حساب ID تسلسلي
    const nextId = safeLevels.length > 0 
      ? Math.max(...safeLevels.map(l => l.id)) + 1 
      : 1;

    const updatedCourse = {
      ...selectedCourse,
      levels: [
        ...safeLevels,
        {
          id: nextId,
          ...newLevel,
          lectures: [],
          quiz: []
        }
      ]
    };

    setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
    setSelectedCourse(updatedCourse);
    setNewLevel({ title: "", description: "" });
    setShowAddLevelModal(false);
  };

  //  دالة حذف مستوى
  const handleDeleteLevel = (levelId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستوى وجميع محتوياته؟")) {
      const updatedCourse = {
        ...selectedCourse,
        levels: selectedCourse.levels.filter(l => l.id !== levelId)
      };
      setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
      setSelectedCourse(updatedCourse);
    }
  };

  //  دالة إضافة محاضرة
  const handleAddLecture = () => {
    if (!newLecture.title || !newLecture.videoUrl || !newLecture.levelId) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    const levelId = parseInt(newLecture.levelId);
    const updatedCourse = { ...selectedCourse };
    const level = updatedCourse.levels?.find(l => l.id === levelId);

    if (level) {
      level.lectures = level.lectures || [];
      level.lectures.push({
        id: Date.now(),
        ...newLecture
      });

      setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
      setSelectedCourse(updatedCourse);
    }

    setNewLecture({ title: "", videoUrl: "", levelId: "" });
    setShowAddLectureModal(false);
  };

  //  دالة حذف محاضرة
  const handleDeleteLecture = (levelId, lectureId) => {
    if (window.confirm("هل أنت متأكد من حذف هذه المحاضرة؟")) {
      const updatedCourse = { ...selectedCourse };
      const level = updatedCourse.levels?.find(l => l.id === levelId);
      if (level) {
        level.lectures = level.lectures.filter(l => l.id !== lectureId);
        setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
        setSelectedCourse(updatedCourse);
      }
    }
  };

  //  دالة إضافة سؤال اختبار
  const handleAddQuiz = () => {
    if (!newQuiz.question || newQuiz.options.some(opt => !opt)) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    const levelId = parseInt(newQuiz.levelId);
    const updatedCourse = { ...selectedCourse };
    const level = updatedCourse.levels?.find(l => l.id === levelId);

    if (level) {
      level.quiz = level.quiz || [];
      level.quiz.push({
        id: Date.now(),
        ...newQuiz
      });

      setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
      setSelectedCourse(updatedCourse);
    }

    setNewQuiz({ question: "", options: ["", "", "", ""], correctAnswer: 0, levelId: "" });
    setShowAddQuizModal(false);
  };

  //  دالة حذف سؤال اختبار
  const handleDeleteQuiz = (levelId, quizId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا السؤال؟")) {
      const updatedCourse = { ...selectedCourse };
      const level = updatedCourse.levels?.find(l => l.id === levelId);
      if (level) {
        level.quiz = level.quiz.filter(q => q.id !== quizId);
        setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
        setSelectedCourse(updatedCourse);
      }
    }
  };

  //  دالة تعديل تفاصيل الدورة
  const handleEditCourse = () => {
    if (!editingCourse.title || !editingCourse.description) {
      alert("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    const updatedCourse = {
      ...selectedCourse,
      title: editingCourse.title,
      description: editingCourse.description,
      category: editingCourse.category,
      duration: editingCourse.duration,
      whatYouWillLearn: whatYouWillLearn,
      curriculum: curriculum
    };

    setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
    setSelectedCourse(updatedCourse);
    setShowEditCourseModal(false);
    alert("تم تحديث تفاصيل الدورة بنجاح!");
  };

  //  دالة تغيير الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setEditTrainer(prev => ({ ...prev, avatar: base64Image }));
        setProfileImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  //  دالة تعديل الملف الشخصي
  const handleEditProfile = () => {
    // تحديث currentUser
    const updatedUser = { ...currentUser, ...editTrainer };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // تحديث بيانات المدرب في قائمة المستخدمين
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...editTrainer };
      localStorage.setItem("users", JSON.stringify(users));
    }

    // تحديث الحالة
    setEditTrainer(editTrainer);

    setShowEditProfileModal(false);
    alert("تم تحديث الملف الشخصي بنجاح!");
  };

  //  دالة تغيير كلمة المرور
  const handleChangePassword = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === currentUser.email);

    if (!user) {
      alert("لم يتم العثور على المستخدم");
      return;
    }

    if (user.password !== currentPassword) {
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

    user.password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("تم تغيير كلمة المرور بنجاح!");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePasswordModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* الشريط الجانبي */}
      <aside className="w-64 bg-indigo-800 text-white min-h-screen p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">لوحة المدرب</h1>
          <p className="text-indigo-200">مرحباً، {currentUser?.name}</p>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("courses")}
            className={`w-full text-right px-4 py-2 rounded-lg transition ${
              activeTab === "courses" ? "bg-indigo-600" : "hover:bg-indigo-700"
            }`}
          >
            دوراتي
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-right px-4 py-2 rounded-lg transition ${
              activeTab === "profile" ? "bg-indigo-600" : "hover:bg-indigo-700"
            }`}
          >
            ملفي الشخصي
          </button>
        </nav>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-8">
        {/* الهيدر */}
        <header className="bg-white shadow-sm mb-8 p-6 rounded-lg flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">لوحة تحكم المدرب</h2>
          <button
            onClick={() => navigateTo("home")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            تسجيل الخروج
          </button>
        </header>

        {/* إدارة الدورات */}
        {activeTab === "courses" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">دوراتك</h2>
            {trainerCourses.length === 0 ? (
              <p>ليس لديك دورات بعد. راجع المدير لتعيينك.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trainerCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
                    <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded-lg mb-4"/>
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="text-sm text-gray-600">المستويات: {course.levels?.length || 0}</p>
                    <p className="text-sm text-gray-600">المحاضرات: {course.levels?.reduce((acc, level) => acc + (level.lectures?.length || 0), 0) || 0}</p>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                    >
                      إدارة الدورة
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ملف المدرب الشخصي */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-6 mb-6">
              <img
                src={editTrainer.avatar || "https://picsum.photos/200/200"}
                alt="صورة المدرب"
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
              />
              <div>
                <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                <p className="text-gray-600">{currentUser.email}</p>
                <p className="text-gray-600">{currentUser.phone || "غير متوفر"}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">نبذة عن المدرب</h3>
              <p className="text-gray-700">{currentUser.bio || "لا يوجد وصف شخصي بعد."}</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setEditTrainer({ ...currentUser });
                  setProfileImageFile(null);
                  setShowEditProfileModal(true);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
              >
                تعديل الملف الشخصي
              </button>
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="bg-black text-white px-6 py-2 rounded-lg"
              >
                تغيير كلمة المرور
              </button>
            </div>
          </div>
        )}

        {/* إدارة الدورة المحددة */}
        {selectedCourse && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">إدارة: {selectedCourse.title}</h3>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕ إغلاق
              </button>
            </div>

            {/* تعديل تفاصيل الدورة */}
            <div className="mb-6">
              <h4 className="font-bold mb-2">تعديل تفاصيل الدورة</h4>
              <button
                onClick={() => {
                  setEditingCourse({ ...selectedCourse });
                  setWhatYouWillLearn(selectedCourse.whatYouWillLearn || []);
                  setCurriculum(selectedCourse.curriculum || []);
                  setShowEditCourseModal(true);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
              >
                تعديل التفاصيل
              </button>
            </div>

            {/* إضافة مستوى */}
            <div className="mb-6">
              <h4 className="font-bold mb-2">إضافة مستوى</h4>
              <button
                onClick={() => setShowAddLevelModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                إضافة مستوى جديد
              </button>
            </div>

            {/* إضافة محاضرة */}
            <div className="mb-6">
              <h4 className="font-bold mb-2">إضافة محاضرة</h4>
              <button
                onClick={() => setShowAddLectureModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                إضافة محاضرة جديدة
              </button>
            </div>

            {/* إضافة سؤال اختبار */}
            <div className="mb-6">
              <h4 className="font-bold mb-2">إضافة سؤال اختبار</h4>
              <button
                onClick={() => setShowAddQuizModal(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                إضافة سؤال جديد
              </button>
            </div>

            {/* عرض المستويات والمحاضرات */}
            <div>
              <h4 className="font-bold mb-2">المستويات والمحاضرات</h4>
              {Array.isArray(selectedCourse.levels) && selectedCourse.levels.length > 0 ? (
                <div className="space-y-4">
                  {selectedCourse.levels.map(level => (
                    <div key={level.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold">{level.title}</h5>
                        <button
                          onClick={() => handleDeleteLevel(level.id)}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          حذف المستوى
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{level.description}</p>
                      <div className="mt-3">
                        <strong>المحاضرات:</strong>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {Array.isArray(level.lectures) && level.lectures.length > 0 ? (
                            level.lectures.map(lecture => (
                              <li key={lecture.id} className="flex justify-between">
                                <a href={lecture.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {lecture.title}
                                </a>
                                <button
                                  onClick={() => handleDeleteLecture(level.id, lecture.id)}
                                  className="text-red-600 hover:text-red-900 text-sm"
                                >
                                  حذف
                                </button>
                              </li>
                            ))
                          ) : (
                            <li>لا توجد محاضرات بعد.</li>
                          )}
                        </ul>
                      </div>
                      <div className="mt-3">
                        <strong>الاختبار:</strong>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {Array.isArray(level.quiz) && level.quiz.length > 0 ? (
                            level.quiz.map(q => (
                              <li key={q.id} className="flex justify-between">
                                {q.question} (الإجابة الصحيحة: {q.options[q.correctAnswer]})
                                <button
                                  onClick={() => handleDeleteQuiz(level.id, q.id)}
                                  className="text-red-600 hover:text-red-900 text-sm"
                                >
                                  حذف
                                </button>
                              </li>
                            ))
                          ) : (
                            <li>لا توجد أسئلة اختبار بعد.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>لا توجد مستويات بعد.</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* نافذة تعديل تفاصيل الدورة */}
      {showEditCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">تعديل تفاصيل الدورة</h3>
            <div className="space-y-6">
              {/* عنوان الدورة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الدورة</label>
                <input
                  type="text"
                  value={editingCourse.title || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              {/* وصف الدورة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">وصف الدورة</label>
                <textarea
                  value={editingCourse.description || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows="3"
                  required
                />
              </div>

              {/* الفئة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
                <input
                  type="text"
                  value={editingCourse.category || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              {/* المدة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المدة (بالساعات)</label>
                <input
                  type="number"
                  value={editingCourse.duration || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              {/* ماذا ستتعلم؟ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ماذا ستتعلم؟</label>
                <div className="space-y-2">
                  {whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...whatYouWillLearn];
                          updated[index] = e.target.value;
                          setWhatYouWillLearn(updated);
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="مثلاً: تحليل الجمهور المستهدف"
                      />
                      <button
                        onClick={() => setWhatYouWillLearn(whatYouWillLearn.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setWhatYouWillLearn([...whatYouWillLearn, ""])}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    + إضافة هدف
                  </button>
                </div>
              </div>

              {/* المحتوى التعليمي */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المحتوى التعليمي</label>
                <div className="space-y-2">
                  {curriculum.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...curriculum];
                          updated[index] = { ...updated[index], title: e.target.value };
                          setCurriculum(updated);
                        }}
                        placeholder="عنوان المحور"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      />
                      <input
                        type="text"
                        value={item.duration}
                        onChange={(e) => {
                          const updated = [...curriculum];
                          updated[index] = { ...updated[index], duration: e.target.value };
                          setCurriculum(updated);
                        }}
                        placeholder="المدة"
                        className="w-20 border border-gray-300 rounded-lg px-4 py-2"
                      />
                      <button
                        onClick={() => setCurriculum(curriculum.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setCurriculum([...curriculum, { title: "", duration: "" }])}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    + إضافة محور
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowEditCourseModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleEditCourse}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة إضافة مستوى */}
      {showAddLevelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-6">إضافة مستوى جديد</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المستوى</label>
                <input
                  type="text"
                  value={newLevel.title}
                  onChange={(e) => setNewLevel({ ...newLevel, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">وصف المستوى</label>
                <textarea
                  value={newLevel.description}
                  onChange={(e) => setNewLevel({ ...newLevel, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddLevelModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddLevel}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                إضافة المستوى
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة إضافة محاضرة */}
      {showAddLectureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-6">إضافة محاضرة جديدة</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اختر المستوى</label>
                <select
                  value={newLecture.levelId}
                  onChange={(e) => setNewLecture({ ...newLecture, levelId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                >
                  <option value="">اختر مستوى</option>
                  {Array.isArray(selectedCourse?.levels) && selectedCourse.levels.map(level => (
                    <option key={level.id} value={level.id}>
                      {level.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المحاضرة</label>
                <input
                  type="text"
                  value={newLecture.title}
                  onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رابط الفيديو (يوتيوب أو أي رابط)</label>
                <input
                  type="url"
                  value={newLecture.videoUrl}
                  onChange={(e) => setNewLecture({ ...newLecture, videoUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddLectureModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddLecture}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                إضافة المحاضرة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة إضافة سؤال اختبار */}
      {showAddQuizModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-6">إضافة سؤال اختبار</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اختر المستوى</label>
                <select
                  value={newQuiz.levelId}
                  onChange={(e) => setNewQuiz({ ...newQuiz, levelId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                >
                  <option value="">اختر مستوى</option>
                  {Array.isArray(selectedCourse?.levels) && selectedCourse.levels.map(level => (
                    <option key={level.id} value={level.id}>
                      {level.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">السؤال</label>
                <textarea
                  value={newQuiz.question}
                  onChange={(e) => setNewQuiz({ ...newQuiz, question: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows="2"
                  required
                />
              </div>
              {newQuiz.options.map((opt, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الإجابة {index + 1}</label>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const options = [...newQuiz.options];
                      options[index] = e.target.value;
                      setNewQuiz({ ...newQuiz, options });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الإجابة الصحيحة</label>
                <select
                  value={newQuiz.correctAnswer}
                  onChange={(e) => setNewQuiz({ ...newQuiz, correctAnswer: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  {newQuiz.options.map((opt, index) => (
                    <option key={index} value={index}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddQuizModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddQuiz}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                إضافة السؤال
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تعديل الملف الشخصي */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-6">تعديل الملف الشخصي</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input
                  type="text"
                  value={editTrainer.name}
                  onChange={(e) => setEditTrainer({ ...editTrainer, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={editTrainer.email}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  value={editTrainer.phone}
                  onChange={(e) => setEditTrainer({ ...editTrainer, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف الشخصي</label>
                <textarea
                  value={editTrainer.bio}
                  onChange={(e) => setEditTrainer({ ...editTrainer, bio: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows="3"
                />
              </div>

              {/*  تحميل الصورة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">صورة الملف الشخصي</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                {editTrainer.avatar && (
                  <div className="mt-2">
                    <img 
                      src={editTrainer.avatar} 
                      alt="معاينة الصورة" 
                      className="w-20 h-20 object-cover rounded-full mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleEditProfile}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تغيير كلمة المرور */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
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
                onClick={() => setShowChangePasswordModal(false)}
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
    </div>
  );
};

export default TrainerDashboard;