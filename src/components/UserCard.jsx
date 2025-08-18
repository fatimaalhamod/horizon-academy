import React from 'react';

const UserCard = ({ user, onDeleteUser, onEditUser }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between transition-all duration-200 hover:shadow-md">
      <div>
        <h4 className="font-bold">{user.name}</h4>
        <p className="text-sm text-gray-600">{user.email}</p>
        <span className={`inline-block px-2 py-1 rounded-full text-sm mt-1 ${
          user.role === "admin" ? "bg-red-100 text-red-800" :
          user.role === "trainer" ? "bg-purple-100 text-purple-800" :
          "bg-blue-100 text-blue-800"
        }`}>
          {user.role === "admin" ? "مدير" : 
           user.role === "trainer" ? "مدرب" : "طالب"}
        </span>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => onEditUser(user)}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button 
          onClick={() => onDeleteUser(user.id)}
          className="text-red-600 hover:text-red-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserCard;