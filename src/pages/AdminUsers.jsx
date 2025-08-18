// src/pages/AdminDashboard.js
import React, { useState } from "react";

const AdminDashboard = ({ navigateTo, currentUser, courses, users, setCourses, setUsers }) => {
  const [activeTab, setActiveTab] = useState("courses");

  // بيانات إضافة دورة
  const [newCourse, setNewCourse] = useState({
    title: "",
    instructorEmail: "",
    image: "/assets/marketing.jpeg", // ✅ مسار صحيح
    description: "",
    category: "",
    duration: ""
  });

  // بيانات إضافة مستخدم
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "طالب"
  });

  // دالة إضافة دورة
  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.instructorEmail || !newCourse.description) {
      alert("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    // البحث عن المدرب في قائمة المستخدمين
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
      image: newCourse.image,
      description: newCourse.description,
      category: newCourse.category || "عام",
      duration: newCourse.duration || "10 ساعات",
      rating: 4.5,
      students: 0,
      levels: []
    };

    setCourses([...courses, newCourseObj]);
    setNewCourse({
      title: "",
      instructorEmail: "",
      image: "/assets/marketing.jpeg",
      description: "",
      category: "",
      duration: ""
    });
    alert("تمت إضافة الدورة بنجاح!");
  };

  // دالة إضافة مستخدم
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    const exists = users.some(u => u.email === newUser.email);
    if (exists) {
      alert("هذا البريد الإلكتروني مسجل مسبقًا");
      return;
    }

    const userObj = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      phone: "",
      bio: ""
    };

    setUsers([...users, userObj]);
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "طالب"
    });
    alert("تمت إضافة المستخدم بنجاح!");
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
    }
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
            onClick={() => setActiveTab("courses")}
            className={`w-full text-right px-4 py-2 rounded-lg transition ${
              activeTab === "courses" ? "bg-indigo-600" : "hover:bg-indigo-700"
            }`}
          >
            إدارة الدورات
          </button>
          <button
            onClick={() => setActiveTab("users")}
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
          <h2 className="text-2xl font-bold text-gray-800">لوحة تحكم المدير</h2>
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
            <h2 className="text-2xl font-bold mb-6">إدارة الدورات</h2>

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">بريد المدرب</label>
                  <input
                    type="email"
                    value={newCourse.instructorEmail}
                    onChange={(e) => setNewCourse({ ...newCourse, instructorEmail: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="sara@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رابط الصورة</label>
                  <input
                    type="url"
                    value={newCourse.image}
                    onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="https://picsum.photos/600/400"
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

            {/* عرض الدورات */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المدرب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عدد الطلاب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">لا توجد دورات بعد.</td>
                    </tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full object-cover" src={course.image} alt={course.title} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{course.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.instructor?.name || course.instructor}</div>
                          <div className="text-sm text-gray-500">{course.instructor?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.students}</td>
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
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* إدارة المستخدمين */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">إدارة المستخدمين</h2>

            {/* نموذج إضافة مستخدم */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">إضافة مستخدم جديد</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="طالب">طالب</option>
                    <option value="مدرب">مدرب</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleAddUser}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                إضافة المستخدم
              </button>
            </div>

            {/* عرض المستخدمين */}
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
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">لا توجد مستخدمين بعد.</td>
                    </tr>
                  ) : (
                    users.map((user) => (
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;