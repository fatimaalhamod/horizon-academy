// src/components/CertificateGenerator.jsx
import React from "react";
import logo from "../assets/images/logo.png";
import diplome from "../assets/images/diplome.png";
import slogan from "../assets/images/slogan.jpg";
import QRCode from "react-qr-code";

// 🔹 دالة لتنسيق التاريخ الميلادي
const formatDate = (dateString) => {
  if (!dateString) return "تاريخ غير محدد";

  try {
    const date = new Date(dateString);
    
    // التأكد من صحة التاريخ
    if (isNaN(date)) {
      console.warn("تاريخ غير صالح:", dateString);
      return dateString;
    }

    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("خطأ في تنسيق التاريخ:", error);
    return "تاريخ غير محدد";
  }
};

const CertificateGenerator = ({
  studentName,
  courseTitle,
  instructorName,
  completionDate,
  certificateId = "444700",
}) => {
  // ✅ إصلاح الرابط (إزالة المسافات الزائدة)
  const verifyUrl = `https://horizon-academy.com/verify/${certificateId}`;

  return (
    <div className="relative w-[1000px] h-[700px] mx-auto shadow-2xl rounded-xl overflow-hidden bg-white">
      {/* خلفية الشهادة */}
      <img
        src={diplome}
        alt="خلفية الشهادة"
        className="absolute inset-0 w-full h-full object-cover object-center"
        onError={(e) => {
          e.target.style.backgroundColor = "#f0f4f8";
          e.target.style.opacity = "0.1";
        }}
      />

      {/* شعار الأكاديمية */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <img 
          src={logo} 
          alt="شعار الأكاديمية" 
          className="h-20 mx-auto mb-1"
          onError={(e) => {
            e.target.style.display = "none";
            const parent = e.target.parentElement;
            const placeholder = document.createElement("div");
            placeholder.textContent = "شعار الأكاديمية";
            placeholder.className = "text-blue-700 font-bold";
            parent.appendChild(placeholder);
          }}
        />
        <h1 className="text-3xl font-bold text-blue-700 tracking-wide">
          أكاديمية الأفق
        </h1>
      </div>

      {/* نص إتمام */}
      <p className="absolute top-48 left-1/2 transform -translate-x-1/2 text-lg text-gray-800 font-medium">
        هذه الشهادة تؤكد إتمام
      </p>

      {/* اسم الطالب */}
      <h2 className="absolute top-60 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-gray-900 max-w-[80%] break-words text-center leading-tight">
        {studentName || "اسم الطالب"}
      </h2>

      {/* تفاصيل الدورة */}
      <p className="absolute top-80 left-1/2 transform -translate-x-1/2 w-[80%] text-center text-lg text-gray-700">
        للدورة التدريبية على منصة الأفق الإلكترونية بعنوان
      </p>
      <h3 className="absolute top-[370px] left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-gray-900 max-w-[70%] text-center leading-tight">
        {courseTitle || "عنوان الدورة"}
      </h3>

      {/* بيانات المدرب والتاريخ */}
      <div className="absolute top-[500px] left-1/2 transform -translate-x-1/2 w-[80%] flex justify-between px-20 text-gray-900 text-lg">
        <div className="text-right">
          <p className="font-medium text-gray-800">المدرب</p>
          <p className="font-bold">{instructorName || "غير محدد"}</p>
        </div>
        <div className="text-left">
          <p className="font-medium text-gray-800">تاريخ الإصدار</p>
          <p className="font-bold">{formatDate(completionDate)}</p>
        </div>
      </div>

      {/* ختم الأكاديمية */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
        <img 
          src={slogan} 
          alt="ختم الأكاديمية" 
          className="h-24 w-24 opacity-90 rounded-full shadow-md"
          onError={(e) => {
            e.target.style.display = "none";
            const parent = e.target.parentElement;
            const placeholder = document.createElement("div");
            placeholder.textContent = "ختم";
            placeholder.className = "w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs";
            parent.appendChild(placeholder);
          }}
        />
      </div>

      {/* رقم الشهادة */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-700 text-sm font-medium">
        رقم الشهادة: {certificateId}
      </div>
    </div>
  );
};

export default CertificateGenerator;