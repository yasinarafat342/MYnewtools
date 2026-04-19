import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <button onClick={() => navigate(-1)} className="font-bold text-primary mb-5">← Back</button>
      <div className="bg-white p-10 rounded-[40px] shadow-xl border-4 border-white">
        <h1 className="text-4xl font-black mb-4">Friend Details</h1>
        <p className="text-gray-500 font-bold">Viewing profile for Friend ID: {id}</p>
        <div className="mt-10 p-5 bg-gray-50 rounded-2xl border-2 border-dashed">
            ডাটা লোড করার লজিক এখানে থাকবে।
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;