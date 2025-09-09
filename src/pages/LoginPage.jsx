// src/pages/Login.jsx
import React, { useState } from "react";

const Login = ({ navigateTo, handleLogin, currentUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

    // ✅ استدعاء الدالة الأصلية للتسجيل
    handleLogin({ email: formData.email, password: formData.password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* ✅ حقل خفي لخداع المتصفح */}
      <input type="text" className="hidden" autoComplete="username" value="" readOnly />
      <input type="password" className="hidden" autoComplete="new-password" value="" readOnly />

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit}>
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
              autoComplete="off" // ← إيقاف التعبئة التلقائية
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
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
              autoComplete="new-password" // ← يقلل من التعبئة التلقائية
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            تسجيل الدخول
          </button>
        </form>
        <p className="mt-4 text-center">
          ليس لديك حساب؟{" "}
          <button onClick={() => navigateTo("register")} className="text-blue-600 hover:underline">
            إنشاء حساب
          </button>
          <button 
       onClick={() => navigateTo("forgot-password")} 
      className="text-blue-600 hover:underline text-sm mt-2 block"
>
  نسيت كلمة المرور؟
</button>
        </p>
      </div>
    </div>
  );
};

export default Login;