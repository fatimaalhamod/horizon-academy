// src/pages/ForgotPassword.jsx
import React, { useState } from "react";

const ForgotPassword = ({ navigateTo }) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: إدخال البريد، 2: إدخال الرمز، 3: تغيير كلمة المرور
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ توليد رمز تحقق (في المشروع الحقيقي، يُرسل عبر البريد)
  const verificationCode = "123456"; // رمز تجريبي

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) {
      alert("يرجى إدخال البريد الإلكتروني");
      return;
    }

    // في المشروع الحقيقي: أرسل الرمز إلى البريد
    alert(`تم إرسال رمز التحقق إلى ${email}\n(الرمز التجريبي: ${verificationCode})`);
    setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code !== verificationCode) {
      alert("الرمز غير صحيح");
      return;
    }
    setStep(3);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    // تحديث كلمة المرور في المستخدمين
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
      alert("هذا البريد غير مسجل");
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    alert("تم تغيير كلمة المرور بنجاح!");
    navigateTo("login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 ? "نسيت كلمة المرور؟" : step === 2 ? "أدخل رمز التحقق" : "أدخل كلمة مرور جديدة"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              إرسال الرمز
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">رمز التحقق</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="123456"
                required
              />
              <p className="text-gray-500 text-xs mt-1">* في المشروع الحقيقي، يُرسل الرمز إلى بريدك</p>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
              التحقق
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور الجديدة</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="أدخل كلمة المرور الجديدة"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">تأكيد كلمة المرور</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="أعد إدخال كلمة المرور"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              تغيير كلمة المرور
            </button>
          </form>
        )}

        <p className="mt-4 text-center">
          <button onClick={() => navigateTo("login")} className="text-blue-600 hover:underline">
            العودة إلى تسجيل الدخول
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;