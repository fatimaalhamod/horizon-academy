
import React, { useState } from "react";

const AdminDashboard = ({ navigateTo, currentUser, courses, users, setCourses, setUsers }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedUser, setSelectedUser] = useState(null);

  //  بيانات البحث والتصفية
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("الكل");
  const [roleFilter, setRoleFilter] = useState("الكل");

  //  حساب الإحصائيات
  const totalCourses = courses.length;
  const totalUsers = users.length;
  const totalStudents = users.filter(u => u.role === "طالب").length;
  const totalTrainers = users.filter(u => u.role === "مدرب").length;

  //  استخراج الفئات الفريدة
  const categories = ["الكل", ...new Set(courses.map(course => course.category))];

  //  تصفية الدورات
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "الكل" || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  //  تصفية المستخدمين
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "الكل" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // بيانات إضافة دورة
  const [newCourse, setNewCourse] = useState({
    title: "",
    instructorEmail: "",
    image: "/assets/images/marketing.jpeg", //  تأكد من صحة المسار
    description: "",
    category: "",
    duration: ""
  });

  // دالة تعيين مدرب لدورة
  const handleAssignInstructor = (courseId, trainerEmail) => {
    if (!trainerEmail) return;

    const trainer = users.find(u => u.email === trainerEmail && u.role === "مدرب");
    if (!trainer) {
      alert("لم يتم العثور على المدرب");
      return;
    }

    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          instructor: {
            email: trainer.email,
            name: trainer.name
          }
        };
      }
      return course;
    });

    setCourses(updatedCourses);
    alert(`تم تعيين ${trainer.name} كمدرب للدورة بنجاح!`);
  };

  //  دالة إضافة دورة مع مستوى أول تلقائيًا
  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.instructorEmail || !newCourse.description) {
      alert("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    const instructor = users.find(u => u.email === newCourse.instructorEmail && u.role === "مدرب");
    if (!instructor) {
      alert("لم يتم العثور على مدرب بهذا البريد الإلكتروني");
      return;
    }

    const newCourseObj = {
      id: Date.now(),
      title: newCourse.title,
      instructor: {
        email: instructor.email,
        name: instructor.name
      },
      image: newCourse.image || "/assets/images/marketing.jpeg",
      description: newCourse.description,
      category: newCourse.category || "عام",
      duration: newCourse.duration || "10 ساعات",
      rating: 4.5,
      students: 0,
      levels: [
        {
          id: Date.now() + 1,
          title: "المستوى الأول: الاساسيات",
          description: "ابدأ بإضافة المحاضرات والاختبارات لهذا المستوى.",
          lectures: [],
          quiz: [] // سيكون جاهزًا للاختبار
        }
      ]
    };

    setCourses([...courses, newCourseObj]);
    setNewCourse({
      title: "",
      instructorEmail: "",
      image: "",
      description: "",
      category: "",
      duration: ""
    });
    alert("✅ تم إضافة الدورة بنجاح! تحتوي على مستوى أول جاهز للتعديل.");
  };

  // دالة حذف دورة
  const handleDeleteCourse = (courseId) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الدورة؟")) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  // دالة حذف مستخدم
  const handleDeleteUser = (userId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      setUsers(users.filter(u => u.id !== userId));
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
    }
  };

  // دالة عرض تفاصيل المستخدم
  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  //  دالة تعيين مستخدم كمدرب
  const handleAssignAsTrainer = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, role: "مدرب" };
      }
      return user;
    });
    setUsers(updatedUsers);
    alert(`تم تعيين المستخدم كمدرب بنجاح!`);
  };

  //  دالة إلغاء تعيين المدرب
  const handleRemoveTrainerRole = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, role: "طالب" };
      }
      return user;
    });
    setUsers(updatedUsers);
    alert(`تم إلغاء تعيين المستخدم كمدرب.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* الشريط الجانبي */}
      <aside className="w-64 bg-indigo-800 text-white min-h-screen p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">لوحة الإدارة</h1>
          <p className="text-indigo-200">مرحباً، {currentUser?.name}</p>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => { setActiveTab("dashboard"); setSelectedUser(null); setSearchTerm(""); }}
            className={`w-full text-right px-4 py-2 rounded-lg transition ${
              activeTab === "dashboard" ? "bg-indigo-600" : "hover:bg-indigo-700"
            }`}
          >
            لوحة التحكم
          </button>
          <button
            onClick={() => { setActiveTab("courses"); setSelectedUser(null); setSearchTerm(""); }}
            className={`w-full text-right px-4 py-2 rounded-lg transition ${
              activeTab === "courses" ? "bg-indigo-600" : "hover:bg-indigo-700"
            }`}
          >
            إدارة الدورات
          </button>
          <button
            onClick={() => { setActiveTab("users"); setSelectedUser(null); setSearchTerm(""); }}
            className={`w-full text-right px-4 py-2 rounded-lg transition ${
              activeTab === "users" ? "bg-indigo-600" : "hover:bg-indigo-700"
            }`}
          >
            إدارة المستخدمين
          </button>
        </nav>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-8">
        {/* الهيدر */}
        <header className="bg-white shadow-sm mb-8 p-6 rounded-lg flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === "dashboard" && "لوحة التحكم"}
            {activeTab === "courses" && "إدارة الدورات"}
            {activeTab === "users" && "إدارة المستخدمين"}
          </h2>
          <button
            onClick={() => navigateTo("home")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            تسجيل الخروج
          </button>
        </header>

        {/* لوحة التحكم */}
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">الإحصائيات</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-800">{totalCourses}</div>
                <div className="text-blue-600">عدد الدورات</div>
              </div>
              <div className="bg-green-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-800">{totalUsers}</div>
                <div className="text-green-600">إجمالي المستخدمين</div>
              </div>
              <div className="bg-purple-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-800">{totalStudents}</div>
                <div className="text-purple-600">عدد الطلاب</div>
              </div>
              <div className="bg-yellow-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-yellow-800">{totalTrainers}</div>
                <div className="text-yellow-600">عدد المدربين</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* أحدث الدورات */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">أحدث الدورات</h3>
                <ul className="space-y-3">
                  {courses.slice(-3).reverse().map(course => (
                    <li key={course.id} className="flex justify-between items-center">
                      <span>{course.title}</span>
                      <span className="text-sm text-gray-500">{course.category}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* أحدث المستخدمين */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">أحدث المستخدمين</h3>
                <ul className="space-y-3">
                  {users.slice(-3).reverse().map(user => (
                    <li key={user.id} className="flex justify-between items-center">
                      <span>{user.name}</span>
                      <span className="text-sm text-gray-500">{user.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* إدارة الدورات */}
        {activeTab === "courses" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">إدارة الدورات</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث عن دورة أو مدرب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* نموذج إضافة دورة */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">إضافة دورة جديدة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الدورة</label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اختر المدرب</label>
                  <select
                    value={newCourse.instructorEmail}
                    onChange={(e) => setNewCourse({ ...newCourse, instructorEmail: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  >
                    <option value="">اختر مدربًا</option>
                    {users
                      .filter(u => u.role === "مدرب")
                      .map((trainer) => (
                        <option key={trainer.id} value={trainer.email}>
                          {trainer.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رابط الصورة</label>
                  <input
                    type="url"
                    value={newCourse.image}
                    onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="https://example.com/course.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
                  <input
                    type="text"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    rows="2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المدة (بالساعات)</label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <button
                onClick={handleAddCourse}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                إضافة الدورة
              </button>
            </div>

            {/* تصفية الدورات */}
            <div className="flex space-x-2 space-x-reverse mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    categoryFilter === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* عرض الدورات */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المدرب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطلاب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تعيين المدرب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.instructor?.name || "غير معين"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select
                            value={course.instructor?.email || ""}
                            onChange={(e) => handleAssignInstructor(course.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="">اختر مدربًا</option>
                            {users
                              .filter(u => u.role === "مدرب")
                              .map((trainer) => (
                                <option key={trainer.id} value={trainer.email}>
                                  {trainer.name}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">لا توجد دورات تطابق الفلاتر.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* إدارة المستخدمين */}
        {activeTab === "users" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث عن مستخدم..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <span className="text-sm font-medium text-gray-700">الدور:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="الكل">الكل</option>
                <option value="طالب">طالب</option>
                <option value="مدرب">مدرب</option>
              </select>
            </div>

            {selectedUser ? (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">تفاصيل المستخدم</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p><strong>الاسم:</strong> {selectedUser.name}</p>
                    <p><strong>البريد الإلكتروني:</strong> {selectedUser.email}</p>
                    <p><strong>الدور:</strong> {selectedUser.role}</p>
                    <p><strong>رقم الهاتف:</strong> {selectedUser.phone || "غير متوفر"}</p>
                  </div>
                  <div>
                    <p><strong>تاريخ الميلاد:</strong> {selectedUser.birthDate || "غير متوفر"}</p>
                    <p><strong>السيرة الذاتية:</strong> {selectedUser.bio || "لا يوجد"}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="mt-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  العودة
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البريد الإلكتروني</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدور</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === 'طالب' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              عرض
                            </button>
                            {user.role === "طالب" ? (
                              <button
                                onClick={() => handleAssignAsTrainer(user.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                              >
                                تعيين كمدرب
                              </button>
                            ) : (
                              <button
                                onClick={() => handleRemoveTrainerRole(user.id)}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs"
                              >
                                إلغاء التعيين
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">لا يوجد مستخدمين يطابقون الفلاتر.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;