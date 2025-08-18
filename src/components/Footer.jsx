import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img 
              src="https://placehold.co/150x50?text=أكاديمية+الأفق" 
              alt="أكاديمية الأفق" 
              className="h-10 mb-4"
            />
            <p className="text-gray-400">
              نحن ملتزمون بتقديم أفضل تجربة تعليمية رقمية في المنطقة، مع التركيز على الجودة والابتكار في التعليم.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:text-white">الدورات</button></li>
              <li><a href="#" className="hover:text-white">المدربين</a></li>
              <li><a href="#" className="hover:text-white">الأسئلة الشائعة</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <p className="text-gray-400 mb-2">horizonacademy@gmail.com</p>
            <p className="text-gray-400 mb-4">0963932684879</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                فيسبوك
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                إنستغرام
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">النشرة الإخبارية</h3>
            <p className="text-gray-400 mb-4">اشترك لتستلم آخر الأخبار والعروض</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="px-4 py-2 rounded-l-lg text-gray-800 flex-grow"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg">
                اشتراك
              </button>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <p className="text-center text-gray-400">
          © 2023 أكاديمية الأفق للدورات التعليمية. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;