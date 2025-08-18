import React, { useState } from "react";

const VerificationPage = ({ 
  showVerificationModal, 
  verificationCode, 
  setVerificationCode, 
  verifyCode, 
  navigateTo 
}) => {
  if (!showVerificationModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-6">رمز التحقق</h2>
        <p className="text-gray-600 mb-4">تم إرسال رمز التحقق إلى بريدك الإلكتروني</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              أدخل الرمز المكون من 6 أرقام
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-center text-2xl tracking-widest"
              placeholder="------"
              maxLength="6"
            />
          </div>
        </form>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button 
            onClick={() => navigateTo("register")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            إلغاء
          </button>
          <button 
            onClick={verifyCode}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            تحقق
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VerificationPage;