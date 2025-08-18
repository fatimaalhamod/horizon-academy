// src/pages/Register.jsx
import React, { useState } from "react";

const Register = ({ navigateTo, handleRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // ✅ إزالة الخطأ عند الكتابة
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    // ✅ التحقق من الاسم
    if (!formData.name) {
      newErrors.name = "الاسم مطلوب";
    } else if (formData.name.length < 3) {
      newErrors.name = "يجب أن يكون الاسم من 3 أحرف على الأقل";
    }

    // ✅ التحقق من البريد الإلكتروني
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    }

    // ✅ التحقق من كلمة المرور
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    // ✅ التحقق من تأكيد كلمة المرور
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "يرجى تأكيد كلمة المرور";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ التحقق من الصحة
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // ✅ إرسال البيانات إلى App.jsx (بدون تأكيد كلمة المرور)
    const { confirmPassword, ...userData } = formData;
    handleRegister(userData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* ✅ حقول خفية لخداع المتصفح */}
      <input type="text" className="hidden" autoComplete="username" value="" readOnly />
      <input type="password" className="hidden" autoComplete="new-password" value="" readOnly />

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h2>
        <form onSubmit={handleSubmit}>
          {/* حقل الاسم */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="مثلاً: فاطمة"
              autoComplete="off"
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* حقل البريد الإلكتروني */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="example@gmail.com"
              autoComplete="new-email"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* حقل كلمة المرور */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="أدخل كلمة المرور"
              autoComplete="new-password"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* حقل تأكيد كلمة المرور */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">تأكيد كلمة المرور</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="أعد إدخال كلمة المرور"
              autoComplete="new-password"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            إنشاء الحساب
          </button>
        </form>
        <p className="mt-4 text-center">
          لديك حساب بالفعل؟{" "}
          <button onClick={() => navigateTo("login")} className="text-blue-600 hover:underline">
            تسجيل الدخول
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;