import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, Video, Bell, Archive, Trash2, Edit2, Clock } from 'lucide-react';
import { useInteractions } from '../InteractionContext'; // কন্টেক্সট ইম্পোর্ট
import toast, { Toaster } from 'react-hot-toast'; // নোটিফিকেশন এর জন্য

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const { addInteraction } = useInteractions(); // কন্টেক্সট থেকে ফাংশন নেওয়া

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(f => f.id === parseInt(id));
        setFriend(found);
      });
  }, [id]);

  // ইন্টারঅ্যাকশন হ্যান্ডলার
  const handleInteraction = (type) => {
    if (!friend) return;

    const newInteraction = {
      type: type,
      person: friend.name,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      timestamp: new Date().getTime()
    };
    
    // টাইমলাইনে ডাটা পাঠানো
    addInteraction(newInteraction);

    // সুন্দর নোটিফিকেশন দেখানো
    toast.success(`${type} interaction logged for ${friend.name}!`, {
      style: {
        borderRadius: '16px',
        background: '#2B4E41',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '14px'
      },
    });

    // চাইলে সরাসরি টাইমলাইনে নিয়ে যেতে পারো নিচের লাইনটি আনকমেন্ট করে
    // setTimeout(() => navigate('/timeline'), 1500); 
  };

  if (!friend) return <div className="p-20 text-center font-black">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 bg-[#F9FAFB]">
      {/* নোটিফিকেশন হোল্ডার */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- Left Sidebar (Profile) --- */}
      <div className="lg:w-1/4 flex flex-col gap-6">
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <img 
            src={friend.picture} 
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-md" 
            alt={friend.name} 
          />
          <h2 className="text-2xl font-black text-gray-900 mb-1">{friend.name}</h2>
          
          <span className={`px-6 py-1 rounded-full text-[10px] font-black uppercase mb-4 shadow-sm text-white
            ${friend.status === 'overdue' ? 'bg-[#EF4444]' : 'bg-[#10B981]'}`}>
            {friend.status}
          </span>

          <div className="flex gap-2 mb-6">
            {friend.tags.map(tag => (
              <span key={tag} className="bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm font-medium leading-relaxed italic">"{friend.bio}"</p>
        </div>

        {/* Action Menu */}
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 font-bold text-sm text-gray-600">
          <button className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 border-b border-gray-50 transition-colors">
            <Bell size={18} /> Snooze 2 Weeks
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 border-b border-gray-50 transition-colors">
            <Archive size={18} /> Archive
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 size={18} /> Delete Profile
          </button>
        </div>
      </div>

      {/* --- Right Side (Stats & Check-in) --- */}
      <div className="lg:w-3/4 flex flex-col gap-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 text-center">
            <h3 className="text-5xl font-black text-[#2B4E41]">{friend.days_since_contact}</h3>
            <p className="text-gray-400 text-[10px] font-black uppercase mt-2">Days Since Contact</p>
          </div>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 text-center">
            <h3 className="text-5xl font-black text-[#2B4E41]">{friend.goal}</h3>
            <p className="text-gray-400 text-[10px] font-black uppercase mt-2">Goal (Days)</p>
          </div>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-black text-[#2B4E41]">{friend.next_due_date || 'Feb 27, 2026'}</h3>
            <p className="text-gray-400 text-[10px] font-black uppercase mt-2">Next Due</p>
          </div>
        </div>

        {/* Relationship Goal */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 relative">
          <button className="absolute top-6 right-8 text-gray-400 border border-gray-200 px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1 hover:bg-gray-50 transition-all">
            <Edit2 size={14} /> Edit
          </button>
          <h4 className="text-[10px] font-black text-gray-900 mb-4 uppercase tracking-[0.2em]">Relationship Goal</h4>
          <p className="text-gray-500 font-medium">Connect every <span className="text-gray-900 font-black">{friend.goal} days</span></p>
        </div>

        {/* Quick Check-In (ফাংশনাল বাটন) */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
          <h4 className="text-[10px] font-black text-gray-900 mb-6 uppercase tracking-[0.2em]">Quick Check-In</h4>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleInteraction('Call')}
              className="flex flex-col items-center justify-center p-8 rounded-[24px] bg-gray-50 hover:bg-blue-50 transition-all group border border-transparent hover:border-blue-100"
            >
              <Phone className="text-gray-400 group-hover:text-blue-500 mb-2" size={32} />
              <span className="text-[10px] font-black text-gray-400 uppercase group-hover:text-blue-500">Call</span>
            </button>
            <button 
              onClick={() => handleInteraction('Text')}
              className="flex flex-col items-center justify-center p-8 rounded-[24px] bg-gray-50 hover:bg-green-50 transition-all group border border-transparent hover:border-green-100"
            >
              <MessageSquare className="text-gray-400 group-hover:text-green-500 mb-2" size={32} />
              <span className="text-[10px] font-black text-gray-400 uppercase group-hover:text-green-500">Text</span>
            </button>
            <button 
              onClick={() => handleInteraction('Video')}
              className="flex flex-col items-center justify-center p-8 rounded-[24px] bg-gray-50 hover:bg-purple-50 transition-all group border border-transparent hover:border-purple-100"
            >
              <Video className="text-gray-400 group-hover:text-purple-500 mb-2" size={32} />
              <span className="text-[10px] font-black text-gray-400 uppercase group-hover:text-purple-500">Video</span>
            </button>
          </div>
        </div>

        {/* Interactions History Footer */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-50">
            <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Recent Interactions</h4>
            <button onClick={() => navigate('/timeline')} className="flex items-center gap-1 text-gray-400 text-[10px] font-black border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50 transition-all">
              <Clock size={14} /> Full History
            </button>
          </div>
          <div className="py-12 text-center">
             <p className="text-gray-300 font-black uppercase text-[10px] tracking-widest italic">Interactions are logged to your central timeline</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;