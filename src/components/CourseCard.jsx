import React from 'react';

const CourseCard = ({ course, onStartCourse, currentUser }) => {
  const startCourse = () => {
    if (!currentUser) {
      // إعادة التوجيه لصفحة تسجيل الدخول
      window.location.href = '/login';
      return;
    }
    onStartCourse(course);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105">
      <img 
        src={course.thumbnail} 
        alt={course.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
            ⭐ {course.rating}
          </span>
          <span className="text-sm text-gray-500">{course.category}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
          <span>👥 {course.students.toLocaleString()} طالب</span>
          <span>⏱️ {course.duration} ساعة</span>
        </div>
        <div className="mb-4">
          <span className="text-sm text-gray-600">المدرب: {course.trainerName}</span>
        </div>
        <button 
          onClick={startCourse}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          عرض الدورة
        </button>
      </div>
    </div>
  );
};

export default CourseCard;