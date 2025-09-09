// src/pages/CertificatePage.jsx
import React, { useRef } from "react";
import CertificateGenerator from "../components/CertificateGenerator";

const CertificatePage = ({ navigateTo, currentUser, handleLogout, certificate }) => {
  const certificateRef = useRef();

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600">الشهادة غير متوفرة</h2>
          <p className="mt-2">يرجى العودة إلى الملف الشخصي.</p>
          <button
            onClick={() => navigateTo("profile")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            العودة إلى الملف الشخصي
          </button>
        </div>
      </div>
    );
  }

  

  // ✅ دالة تحميل PDF
  const handleDownloadPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');

      const element = certificateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      while (heightLeft > 0) {
        position = heightLeft - pageHeight;
        if (position < 0) {
          position = 0;
        }
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`شهادة_${certificate.courseTitle}.pdf`);
    } catch (error) {
      console.error("فشل في تحميل PDF:", error);
      alert("حدث خطأ أثناء تحميل الشهادة.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white shadow-sm p-4 print:hidden">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">شهادتك الرقمية</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo("profile")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              العودة إلى الملف الشخصي
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              خروج
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* أزرار التحكم (غير مرئية عند الطباعة) */}
        <div className="mb-6 text-center space-x-4 space-x-reverse print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
              📥 تحميل كـ PDF
          </button>
        </div>

        {/* الشهادة */}
        <div ref={certificateRef} className="print-container">
          <CertificateGenerator
            studentName={currentUser.name}
            courseTitle={certificate.courseTitle}
            instructorName={certificate.instructorName}
           completionDate="2025-09-07T14:30:00Z"
          />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-16 print:hidden">
        <div className="container mx-auto text-center">
          <p>© 2025 أكاديمية الأفق. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

     
    </div>
  );
};

export default CertificatePage;