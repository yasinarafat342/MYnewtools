import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <h2 className="text-3xl font-black text-[#2B4E41] mt-4">Oops! Page not found</h2>
      <p className="text-gray-500 mt-2 font-medium max-w-md">
        The page you are looking for doesn't exist or has been moved. 
        Let's get you back on track!
      </p>
      <button 
        onClick={() => navigate('/')}
        className="mt-8 flex items-center gap-2 bg-[#2B4E41] text-white px-8 py-3 rounded-2xl font-black hover:bg-[#1e382e] transition-all shadow-lg"
      >
        <Home size={20} /> Back to Home
      </button>
    </div>
  );
};

export default NotFound;